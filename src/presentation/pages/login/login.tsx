import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Campo Obrigatório',
    password: 'Campo Obrigatório',
    main: ''
  })

  return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { state, errorState } }>
              <form className={Styles.form}>
                  <h2>Login</h2>
                  <Input data-testid="email" type="email" name="email" placeholder='Digite seu e-mail' />
                  <Input type="password" name="password" placeholder='Digite seu senha' />
                  <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                  <span className={Styles.link}>Criar conta</span>
                  <FormStatus />
              </form>
            </Context.Provider>
            <Footer />
        </div>
  )
}

export default Login
