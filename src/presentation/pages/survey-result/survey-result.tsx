import React, { useEffect } from 'react'
import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { type SaveSurveyResult, type LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => {
        setState(old => ({
          ...old,
          isLoading: false,
          surveyResult
        }))
      })
      .catch(handleError)
  }
  const reload = (): void => { setState(old => ({ isLoading: false, surveyResult: null , error: '', reload: !old.reload })) }

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
              <div data-testid="survey-result" className={Styles.contentWrap}>
                {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}/>}
                {state.isLoading && <Loading />}
                {state.error && <Error error={state.error} reload={reload} />}
              </div>
            <Footer />
        </div>
  )
}

export default SurveyResult
