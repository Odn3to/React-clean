import { type FieldValidation } from '@/Validation/protocols/field-validation'
import { RequiredFieldError } from '@/Validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
