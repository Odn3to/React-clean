import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test'
import { mockAuthentication, mockAccountModel } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy< RemoteAuthentication.model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.model>()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with corret values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const autheticationParams = mockAuthentication()
    await sut.auth(autheticationParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(autheticationParams)
  })
  test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw Unexpected if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw Unexpected if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw Unexpected if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should return an Authentication.model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
