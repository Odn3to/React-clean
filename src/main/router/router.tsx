import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={makeLogin} />
                <Route path="/signup" Component={makeSignUp} />
                <Route path="/" element={<SurveyList />} />
            </Routes>
        </BrowserRouter>
  )
}

export default Router
