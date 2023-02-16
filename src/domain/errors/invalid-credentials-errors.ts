export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credenciais inválidos')
    this.name = 'InvalidCredentialsError'
  }
}
