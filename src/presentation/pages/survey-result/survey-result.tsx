import React from 'react'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'

const SurveyResult: React.FC = () => {
  return (
        <div className={Styles.SurveyResultWrap}>
            <Header />
            <div className={Styles.contentWrap}>
              {false &&
                <>
                  <hgroup>
                    <Calendar date={new Date()} className={Styles.calendarWrap} />
                    <h2>Qual é seu framework web favorito?</h2>
                  </hgroup>
                  <FlipMove className={Styles.answerList}>
                      <li>
                          <img src='http://fordevs.herokuapp.com/static/img/logo-react.png'/>
                          <span className={Styles.answer}>ReactJs</span>
                          <span className={Styles.percent}>50%</span>
                      </li>
                      <li>
                          <img src='http://fordevs.herokuapp.com/static/img/logo-vue.png'/>
                          <span className={Styles.answer}>VueJs</span>
                          <span className={Styles.percent}>60%</span>
                      </li>
                      <li>
                          <img src='http://fordevs.herokuapp.com/static/img/logo-angular.png'/>
                          <span className={Styles.answer}>Angular</span>
                          <span className={Styles.percent}>70%</span>
                      </li>
                  </FlipMove>
                  <button>Voltar</button>
                </>
              }
              {false && <Loading />}
            </div>
            <Footer />
        </div>
  )
}

export default SurveyResult
