import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import { type LoadSurveyList } from '@/domain/usecases'
import { mockAccountModel, mockSurveyListModel } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type MemoryHistory, createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { type AccountModel } from '@/domain/models'
import { RecoilRoot } from 'recoil'
import { currentAccountState } from '@/presentation/components'
class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  const mockedState = { setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }
  render(
    <RecoilRoot initializeState={({ set }) => { set(currentAccountState, mockedState) }}>
        <Router location={history.location} navigator={history}>
          <SurveyList loadSurveyList={loadSurveyListSpy}/>
        </Router>
    </RecoilRoot>
  )
  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyListComponent', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    // expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should logout on accessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    // fireEvent.click(screen.queryByTestId('reload'))
    // expect(loadSurveyListSpy.callsCount).toBe(1)
    // await waitFor(() => screen.getByRole('heading'))
  })
})
