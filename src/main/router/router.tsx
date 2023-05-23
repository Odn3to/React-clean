import React from 'react'
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom'
import { makeLoginValidation, makeSignUpValidation, makeSurveyResult } from '@/main/factories/pages'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '../adapters/current-account-adapter'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { Login, Signup, SurveyList } from '@/presentation/pages'
import { makeRemoteAddAccount, makeRemoteAuthentication, makeRemoteLoadSurveyList } from '../factories/usecases'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }
  return (
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, state) }}>
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
              <Route path="/surveys/:id" element={
                  <PrivateRoute>
                    {makeSurveyResult}
                  </PrivateRoute>
              } />
          </Routes>
      </Browser>
    </RecoilRoot>
  )
}

export default Router
