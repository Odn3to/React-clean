import { type LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Error, SurveyContext, SurveyListItem } from './components'

type Props = {
  loadSurveyList: LoadSurveyList | null
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    if (loadSurveyList) {
      loadSurveyList.loadAll()
        .then(surveys => { setState({ ...state, surveys }) })
        .catch(error => {
          setState({ ...state, error: error.message })
        })
    }
  }, [state.reload])
  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                  {state.error ? <Error/> : <SurveyListItem/> }
                </SurveyContext.Provider>
            </div>
            <Footer />
        </div>
  )
}

export default SurveyList
