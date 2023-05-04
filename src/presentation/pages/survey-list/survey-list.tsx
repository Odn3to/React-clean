import { type LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import SurveyItemEmpty from './components/survey-item-empty/survey-item-empty'
import Styles from './survey-list-styles.scss'
import { type SurveyModel } from '@/domain/models'
import { SurveyItem } from './components'

type Props = {
  loadSurveyList: LoadSurveyList | null
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    (async function () {
      if (loadSurveyList) {
        loadSurveyList.loadAll().then(surveys => { setState({ surveys }) })
      }
    })()
  }, [])
  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                  {state.surveys.length
                    ? state.surveys.map((survey: SurveyModel) =>
                    <SurveyItem key={survey.id} survey={survey} />)
                    : <SurveyItemEmpty />
                  }
                </ul>
            </div>
            <Footer />
        </div>
  )
}

export default SurveyList
