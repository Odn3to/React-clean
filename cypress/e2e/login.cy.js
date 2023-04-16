/// <reference types="cypress" />

const { faker } = require("@faker-js/faker")

const baseURL = 'http://localhost:8080/'

Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect a Tauri error about the window
  // and don't want to fail the test so we return false
  if (err.message.includes('window.__TAURI_IPC__ is not a function')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})

describe('login', () => {
  beforeEach(() => {
    cy.visit(baseURL + 'login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password').focus().type(faker.random.word())
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send(401, {
          error: faker.random.words()
        })
      })
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidos')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send(400, {
          error: faker.random.words()
        })
      })
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send(200, {
          accessToken: faker.random.alphaNumeric()
        })
      })
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseURL}`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send(200, {
          invalid: faker.random.alphaNumeric()
        })
      })
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present multiple submits', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send(200, {
          accessToken: faker.random.alphaNumeric()
        })
      })
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
