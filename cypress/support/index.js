const { faker } = require("@faker-js/faker")

Cypress.Commands.add('getByTestId', (id) => {
  return cy.get(`[data-testid=${id}]`)
})

Cypress.Commands.add('testInputStatus', (field, error) => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
})

Cypress.Commands.add('testMainError', (error) => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
})

Cypress.Commands.add('simulateValidSubmit', () => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
})

Cypress.Commands.add('simulateValidSubmitSignUp', () => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
})

Cypress.Commands.add('mockInvalidCredentialsError', (url) => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send(401, {
        error: faker.random.words()
      })
    })
  })
})

Cypress.Commands.add('mockEmailInUseError', (url) => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send(403, {
        error: faker.random.words()
      })
    })
  })
})

Cypress.Commands.add('mockUnexpectedError', (url) => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send(500, {
        error: faker.random.words()
      })
    })
  })
})

Cypress.Commands.add('mockOk', (url, response) => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send(200, 
        response
      )
    })
  })
})