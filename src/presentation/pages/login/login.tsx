/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
    validation.validate('email', state.email)
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) {
      return
    }
    setState({ ...state, isLoading: true })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { state, setState } }>
              <form className={Styles.form} onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <Input data-testid="email" type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input data-testid="password" type="password" name="password" placeholder='Digite seu senha' />
                  <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
                  <span className={Styles.link}>Criar conta</span>
                  <FormStatus />
              </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Login
