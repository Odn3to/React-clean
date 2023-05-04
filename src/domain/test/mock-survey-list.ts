import { faker } from '@faker-js/faker'
import { type SurveyModel } from './../models/survey-model'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.alphaNumeric(),
  question: faker.random.words(10),
  answers: [{
    answer: faker.random.words(4),
    image: faker.random.words(4)
  }, {
    answer: faker.random.words(4)
  }],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])
