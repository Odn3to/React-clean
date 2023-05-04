import React from 'react'
import Styles from './item-empty-styles.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <div>
        <li className={Styles.surveyItemEmpty}></li>
        <li className={Styles.surveyItemEmpty}></li>
        <li className={Styles.surveyItemEmpty}></li>
        <li className={Styles.surveyItemEmpty}></li>
    </div>
  )
}

export default SurveyItemEmpty
