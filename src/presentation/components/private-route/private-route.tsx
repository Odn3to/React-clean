import { ApiContext } from '@/presentation/contexts'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// type Props = {
//   children: any
// }

const PrivateRoute: React.FC<any> = ({ children }: any) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const token = getCurrentAccount()?.accessToken

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default PrivateRoute
