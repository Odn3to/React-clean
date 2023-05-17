import { Calendar, Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon/icon'
import React from 'react'
import Styles from './item-styles.scss'
import { type LoadSurveyList } from '@/domain/usecases'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={Styles.surveyItemWrap}>
        <div className={Styles.surveyContent}>
            <Icon className={Styles.iconWrap} iconName={iconName} />
            <Calendar date={survey.date} className={Styles.calendarWrap}/>
            <p data-testid="question">{survey.question}</p>
        </div>
        <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
