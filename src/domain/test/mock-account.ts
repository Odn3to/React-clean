
import { type Authentication } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { type AccountModel } from '@/domain/models'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(),
  name: faker.name.firstName()
})
