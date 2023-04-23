import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
        <ApiContext.Provider
          value={{
            setCurrentAccount: setCurrentAccountAdapter
          }}
        >
          <BrowserRouter>
              <Routes>
                  <Route path="/login" Component={makeLogin} />
                  <Route path="/signup" Component={makeSignUp} />
                  <Route path="/" element={<SurveyList />} />
              </Routes>
          </BrowserRouter>
        </ApiContext.Provider>
  )
}

export default Router
