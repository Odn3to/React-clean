import React, { memo, useContext } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header-styles.scss'
import { ApiContext } from '@/presentation/contexts'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const history = useNavigate()
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history('/login')
  }

  return (
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.LogoutWrap}>
                    <span data-testid="username">{getCurrentAccount().name}</span>
                    <a data-testid="logout" href='#' onClick={logout}>Sair</a>
                </div>
            </div>
        </header>
  )
}

export default memo(Header)
