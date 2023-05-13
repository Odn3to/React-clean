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

describe('SurveyList', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify({accessToken: faker.random.alphaNumeric(), name: faker.name.firstName()}))
  })

  // it('Should present error on UnexpectedError', () => {
  //   cy.mockForbidenError(/survey/)
  //   cy.visit(baseURL)
  //   cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. tente novamente em breve.')
  // })

  it('Should logout on AccessDeniedError', () => {
    localStorage.setItem('account', JSON.stringify('asdassssd'))
    cy.mockForbidenError(/survey/)
    cy.visit(baseURL)
    cy.url().should('eq', `${baseURL}login`)
  })

  // it('Should Present correct username', () => {
  //   cy.mockServerError(/survey/)
  //   cy.visit(baseURL)
  //   const {name} = localStorage.getItem('account')
  //   console(name)
  //   cy.getByTestId('username').should('contain.text', name)
  // })

  it('Should logout on logout link click', () => {
    cy.mockForbidenError(/survey/)
    cy.visit(baseURL)
    cy.getByTestId('logout').click()
    cy.url().should('eq', `${baseURL}login`)
  })
  

  
})
