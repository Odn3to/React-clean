import React, { useEffect, useState } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'
import { type Validation } from '@/presentation/protocols/validation'
import { type SaveAccessToken, type AddAccount } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessTokenMock: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessTokenMock }: Props) => {
  const navigate = useNavigate()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={ { state, setState } }>
              <form className={Styles.form} data-testid="form" onSubmit={handleSubmit}>
                  <h2>Criar Conta</h2>
                  <Input type="text" name="name" placeholder='Digite seu nome' />
                  <Input type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input type="password" name="password" placeholder='Digite seu senha' />
                  <Input type="password" name="passwordConfirmation" placeholder='Repita seu senha' />
                  <button
                    data-testid="submit"
                    disabled={
                      !!state.emailError || !!state.passwordError || !!state.nameError || !!state.passwordConfirmationError}
                    className={Styles.submit}
                    type="submit"
                  >Entrar</button>
                  <Link data-testid="login-link" to="/login" className={Styles.link}>Voltar Para Login</Link>
                  <FormStatus />
              </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Signup
