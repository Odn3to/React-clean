import { mockHttpResponse } from './../../test/mock-axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test'
import { mockHttpRequest } from '@/data/test'
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
    test('Should call axios with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockHttpRequest()
      await sut.request(request)
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        data: request.body,
        headers: request.headers,
        method: request.method
      })
    })

    test('Should return correct response', async () => {
      const { sut, mockedAxios } = makeSut()
      const promise = await sut.request(mockHttpRequest())
      const axiosResponse = await mockedAxios.request.mock.results[0].value
      expect(promise).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('Should return the correct error ', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promise = sut.request(mockHttpRequest())
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
})
