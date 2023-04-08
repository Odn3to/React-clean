import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('email', state.password),
      passwordConfirmationError: validation.validate('email', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={ { state, setState } }>
              <form className={Styles.form} >
                  <h2>Criar Conta</h2>
                  <Input type="text" name="name" placeholder='Digite seu nome' />
                  <Input type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input type="password" name="password" placeholder='Digite seu senha' />
                  <Input type="password" name="passwordConfirmation" placeholder='Repita seu senha' />
                  <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                  <span className={Styles.link}>Voltar Para Login</span>
                  <FormStatus />
              </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Signup
