declare namespace Cypress{
    interface Chainable{
        getByTestId: (id: string) => Chainable<Element>;
        testInputStatus(field: string, error?: string): void;
        mockInvalidCredentialsError(url: RegExp): void;
        mockUnexpectedError(url: RegExp): void;
        mockOk(url: RegExp, response: any): void;
        testMainError(error: string): void;
        simulateValidSubmit(): void;
        simulateValidSubmitSignUp(): void;
        mockEmailInUseError(): void;
    }
}