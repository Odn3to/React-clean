import { RequiredFieldError } from '@/Validation/errors'
import { RequiredFieldValidation } from '@/Validation/required-field/required-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
