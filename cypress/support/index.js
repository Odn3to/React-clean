Cypress.Commands.add('getByTestId', (id) => {
  return cy.get(`[data-testid=${id}]`)
})

Cypress.Commands.add('faker', (id) => {
  return cy.faker = require('@faker-js/faker')
})