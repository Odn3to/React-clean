import React, { useState } from 'react'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'

const SurveyResult: React.FC = () => {
  const [answers, setAnswers] = useState([{
    image: 'http://fordevs.herokuapp.com/static/img/logo-react.png',
    answer: 'ReactJs',
    percent: 50,
    isCurrentAccountAnswer: true
  }, {
    image: 'http://fordevs.herokuapp.com/static/img/logo-vue.png',
    answer: 'VueJs',
    percent: 60,
    isCurrentAccountAnswer: false
  },{
    image: 'http://fordevs.herokuapp.com/static/img/logo-angular.png',
    answer: 'Angular',
    percent: 70,
    isCurrentAccountAnswer: true
  }
  ])

  return (
        <div className={Styles.SurveyResultWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <hgroup>
                  <Calendar date={new Date()} className={Styles.calendarWrap} />
                  <h2>Qual é seu framework web favorito?</h2>
                </hgroup>
                <FlipMove className={Styles.answerList}>
                    {answers.map(a =>
                    <li key={a.answer}>
                        <img src={a.image}/>
                        <span className={Styles.answer}>{a.answer}</span>
                        <span className={Styles.percent}>{a.percent}</span>
                    </li>
                    )}
                </FlipMove>
                <button onClick={() => {
                  setAnswers([
                    {
                      image: 'http://fordevs.herokuapp.com/static/img/logo-react.png',
                      answer: 'ReactJs',
                      percent: 52,
                      isCurrentAccountAnswer: true
                    }, {
                      image: 'http://fordevs.herokuapp.com/static/img/logo-vue.png',
                      answer: 'VueJs',
                      percent: 61,
                      isCurrentAccountAnswer: false
                    },{
                      image: 'http://fordevs.herokuapp.com/static/img/logo-angular.png',
                      answer: 'Angular',
                      percent: 76,
                      isCurrentAccountAnswer: true
                    }, {
                      image: 'http://fordevs.herokuapp.com/static/img/logo-react.png',
                      answer: 'ReactJs',
                      percent: 60,
                      isCurrentAccountAnswer: true
                    }
                  ])
                }}>Voltar</button>
                {false && <Loading />}
            </div>
            <Footer />
        </div>
  )
}

export default SurveyResult
