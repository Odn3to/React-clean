import React from 'react'
import { Signup } from '@/presentation/pages'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/update-current-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
        <Signup
            addAccount={makeRemoteAddAccount()}
            validation={makeSignUpValidation()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
  )
}
