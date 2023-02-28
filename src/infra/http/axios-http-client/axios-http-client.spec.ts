import { type HttpPostParams } from './../../../data/protocols/http/http-post-client'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'
import { faker } from '@faker-js/faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.words()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const sut = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
