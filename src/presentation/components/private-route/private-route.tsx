import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/presentation/components'

const PrivateRoute: React.FC<any> = ({ children }: any) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  const token = getCurrentAccount()?.accessToken

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default PrivateRoute
