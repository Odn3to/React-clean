import { EmailValidation, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from '@/validation/validators/builder/validation-builder'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.numeric()
    const validations = sut.field(field).min(Number(length)).build()
    expect(validations).toEqual([new MinLengthValidation(field, Number(length))])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.numeric()
    const validations = sut.field(field).required().min(Number(length)).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, Number(length)),
      new EmailValidation(field)
    ])
  })
})
