import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication, type SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessTokenMock: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessTokenMock }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })
  useEffect(() => {
    const emailError = validation.validate('email', state.email)
    const passwordError = validation.validate('email', state.password)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
    validation.validate('email', state.email)
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessTokenMock.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { state, setState } }>
              <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <Input data-testid="email" type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input data-testid="password" type="password" name="password" placeholder='Digite seu senha' />
                  <SubmitButton text="Entrar"/>
                  <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
                  <FormStatus />
              </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Login
