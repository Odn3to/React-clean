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
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
        cy.testInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.testInputStatus('email')
        cy.getByTestId('password').focus().type(password)
        cy.testInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        cy.testInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present EmailInUseError on 403', () => {
        cy.mockEmailInUseError(/signup/)
        cy.simulateValidSubmitSignUp()
        cy.testMainError('Esse email já está em uso')
        cy.url().should('eq', `${baseURL}signup`)
    })

    it('Should present UnexpectedError on 400', () => {
        cy.mockUnexpectedError(/signup/)
        cy.simulateValidSubmitSignUp()
        cy.testMainError('Algo de errado aconteceu. tente novamente em breve.')
        cy.url().should('eq', `${baseURL}signup`)
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        cy.mockOk(/signup/, { invalid: faker.random.alphaNumeric() })
        cy.simulateValidSubmitSignUp()
        cy.testMainError('Algo de errado aconteceu. tente novamente em breve.')
        cy.url().should('eq', `${baseURL}signup`)
    })

    it('Should present save accessToken if valid credentials are provided', () => {
        cy.mockOk(/signup/, { accessToken: faker.random.alphaNumeric() })
        cy.simulateValidSubmitSignUp()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        cy.url().should('eq', `${baseURL}`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    })

    it('Should present multiple submits', () => {
        cy.mockOk(/signup/, { accessToken: faker.random.alphaNumeric() }).as('request')
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
        cy.getByTestId('email').focus().type(faker.internet.email())
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('password').focus().type(password)
        cy.getByTestId('passwordConfirmation').focus().type(password)
        cy.getByTestId('submit').dblclick()
        cy.get('@request.all').should('have.length', 1)
    })
})