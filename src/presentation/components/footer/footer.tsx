import React, { memo } from 'react'
import Styles from './footer.scss'

const footer: React.FC = () => {
  return (
    <footer className={Styles.footer}></footer>
  )
}

export default memo(footer)
