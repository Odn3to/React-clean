import { mockHttpResponse } from './../../test/mock-axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import type axios from 'axios'

jest.mock('axios')

type SybTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SybTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('Post', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return the correct error on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('Get', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})
