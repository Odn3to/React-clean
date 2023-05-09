import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '../adapters/current-account-adapter'
import PrivateRoute from '@/presentation/components/private-route/private-route'

const Router: React.FC = () => {
  return (
        <ApiContext.Provider
          value={{
            setCurrentAccount: setCurrentAccountAdapter,
            getCurrentAccount: getCurrentAccountAdapter
          }}
        >
          <BrowserRouter>
              <Routes>
                  <Route path="/login" Component={makeLogin} />
                  <Route path="/signup" Component={makeSignUp} />
                  <Route element={<PrivateRoute />}>
                    <Route path="/" Component={makeSurveyList} />
                  </Route>
              </Routes>
          </BrowserRouter>
        </ApiContext.Provider>
  )
}

export default Router
