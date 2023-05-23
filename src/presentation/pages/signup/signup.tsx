import React, { useEffect } from 'react'
import Styles from './signup-styles.scss'
import { LoginHeader, Footer, currentAccountState } from '@/presentation/components/'
import { type Validation } from '@/presentation/protocols/validation'
import { type AddAccount } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { signUpState, Input, SubmitButton, FormStatus } from './components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const navigate = useNavigate()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('email', formData)
    const passwordConfirmationError = validation.validate('email', formData)

    setState(old => ({
      ...old,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      navigate('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
        <div className={Styles.signupWrap}>
            <LoginHeader />
              <form className={Styles.form} data-testid="form" onSubmit={handleSubmit}>
                  <h2>Criar Conta</h2>
                  <Input type="text" name="name" placeholder='Digite seu nome' />
                  <Input type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input type="password" name="password" placeholder='Digite seu senha' />
                  <Input type="password" name="passwordConfirmation" placeholder='Repita seu senha' />
                  <SubmitButton text="Cadastrar"/>
                  <Link data-testid="login-link" to="/login" className={Styles.link}>Voltar Para Login</Link>
                  <FormStatus />
              </form>
            <Footer />
        </div>
  )
}

export default Signup
