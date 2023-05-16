import React from 'react'
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import { makeLoginValidation, makeSignUpValidation } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '../adapters/current-account-adapter'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { Login, Signup, SurveyList, SurveyResult } from '@/presentation/pages'
import { makeRemoteAddAccount, makeRemoteAuthentication, makeRemoteLoadSurveyList } from '../factories/usecases'

const Router: React.FC = () => {
  return (
        <ApiContext.Provider
          value={{
            setCurrentAccount: setCurrentAccountAdapter,
            getCurrentAccount: getCurrentAccountAdapter
          }}
        >
          <Browser>
              <Routes>
                  <Route path="/login" element={
                    <Login
                      authentication={makeRemoteAuthentication()}
                      validation={makeLoginValidation()}
                    />}
                  />
                  <Route path="/signup" element={
                    <Signup
                      addAccount={makeRemoteAddAccount()}
                      validation={makeSignUpValidation()}
                    />}
                    />
                  <Route path="/" element={
                    <PrivateRoute>
                        <SurveyList
                          loadSurveyList={makeRemoteLoadSurveyList()}
                        />
                    </PrivateRoute>
                    } />
                  <Route path="/surveys" element={
                      <PrivateRoute>
                        <SurveyResult/>
                      </PrivateRoute>
                  } />
              </Routes>
          </Browser>
        </ApiContext.Provider>
  )
}

export default Router
