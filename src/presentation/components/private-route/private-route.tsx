import { ApiContext } from '@/presentation/contexts'
import { SurveyList } from '@/presentation/pages'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)

  const token = getCurrentAccount()?.accessToken

  return token ? <SurveyList loadSurveyList={null} /> : <Navigate to="/login" replace />
}

export default PrivateRoute
