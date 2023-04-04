import { type AddAccountParams } from './../usecases/add-account'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
