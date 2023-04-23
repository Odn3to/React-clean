import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus, SubmitButton } from '@/presentation/components/'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { type Validation } from '@/presentation/protocols/validation'
import { type Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
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
      setCurrentAccount(account)
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
        <div className={Styles.loginWrap}>
            <LoginHeader />
            <FormContext.Provider value={ { state, setState } }>
              <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <Input data-testid="email" type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input data-testid="password" type="password" name="password" placeholder='Digite seu senha' />
                  <SubmitButton text="Entrar"/>
                  <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
                  <FormStatus />
              </form>
            </FormContext.Provider>
            <Footer />
        </div>
  )
}

export default Login
