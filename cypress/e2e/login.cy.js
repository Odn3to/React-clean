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
    cy.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    cy.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  
  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    cy.mockInvalidCredentialsError(/login/)
    cy.simulateValidSubmit()
    cy.testMainError('Credenciais inválidos')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.mockUnexpectedError(/login/)
    cy.simulateValidSubmit()
    cy.testMainError('Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.mockOk(/login/, { accessToken: faker.random.alphaNumeric() })
    cy.simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.url().should('eq', `${baseURL}`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.mockOk(/login/, { invalid: faker.random.alphaNumeric() })
    cy.simulateValidSubmit()
    cy.testMainError('Algo de errado aconteceu. tente novamente em breve.')
    cy.url().should('eq', `${baseURL}login`)
  })

  it('Should present multiple submits', () => {
    cy.mockOk(/login/, { accessToken: faker.random.alphaNumeric() }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit is form is invalid', () => {
    cy.mockOk(/login/, { accessToken: faker.random.alphaNumeric() }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
