import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { type SaveSurveyResult, type LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }
  const reload = (): void => { setState(old => ({ isLoading: false, surveyResult: null , error: '', reload: !old.reload })) }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => {
        setState(old => ({
          ...old,
          surveyResult
        }))
      })
      .catch(handleError)
  }, [state.reload])

  return (
        <div className={Styles.SurveyResultWrap}>
            <Header />
            <SurveyResultContext.Provider value={{ onAnswer }}>
              <div data-testid="survey-result" className={Styles.contentWrap}>
                {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}/>}
                {state.isLoading && <Loading />}
                {state.error && <Error error={state.error} reload={reload} />}
              </div>
            </SurveyResultContext.Provider>
            <Footer />
        </div>
  )
}

export default SurveyResult
