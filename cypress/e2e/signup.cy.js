const { faker } = require("@faker-js/faker")

const baseURL = 'http://localhost:8080/'

describe('Signup', () => {
    beforeEach(() => {
      cy.visit(baseURL + 'signup')
    })
    it('Should load with correct initial state', () => {
        cy.getByTestId('name').should('have.attr', 'readOnly')
        cy.testInputStatus('name', 'Campo obrigatório')
        cy.getByTestId('email').should('have.attr', 'readOnly')
        cy.testInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password').should('have.attr', 'readOnly')
        cy.testInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
        cy.testInputStatus('passwordConfirmation', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(4))
        cy.testInputStatus('name', 'Valor inválido')
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.testInputStatus('email', 'Valor inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
        cy.testInputStatus('password', 'Valor inválido')
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
        cy.testInputStatus('passwordConfirmation', 'Valor inválido')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
        cy.testInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.testInputStatus('email')
        cy.getByTestId('password').focus().type(password)
        const password = faker.random.alphaNumeric(5)
        cy.testInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        cy.testInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
      })
})