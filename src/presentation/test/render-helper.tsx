import React from 'react'
import { Router } from 'react-router-dom'
import { type MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
import { type AccountModel } from '@/domain/models'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }
  render(
      <RecoilRoot initializeState={({ set }) => { set(currentAccountState, mockedState) }}>
        <Router location={history.location} navigator={history}>
          <Page />
        </Router>
      </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
