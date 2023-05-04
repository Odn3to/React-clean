import { type LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import React, { useEffect } from 'react'
import SurveyItemEmpty from './components/survey-item-empty/survey-item-empty'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList | null
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      if (loadSurveyList) {
        loadSurveyList.loadAll()
      }
    })()
  }, [])
  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                    <SurveyItemEmpty />
                </ul>
            </div>
            <Footer />
        </div>
  )
}

export default SurveyList
