declare namespace Cypress{
    interface Chainable{
        getByTestId: (id: string) => Chainable<Element>;
        testInputStatus(field: string, error?: string): void;
        mockUnauthorizedError(url: RegExp): void;
        mockServerError(url: RegExp): void;
        mockOk(url: RegExp, response: any): void;
        testMainError(error: string): void;
        simulateValidSubmit(): void;
        simulateValidSubmitSignUp(): void;
        mockForbidenError(): void;
    }
}