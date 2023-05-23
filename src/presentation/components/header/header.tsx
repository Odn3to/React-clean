import React, { memo } from 'react'
import { Logo, currentAccountState } from '@/presentation/components'
import Styles from './header-styles.scss'
import { useLogout } from '@/presentation/hooks'
import { useRecoilValue } from 'recoil'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const logoutClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.LogoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href='#' onClick={logoutClick}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
