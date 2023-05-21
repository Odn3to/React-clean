import { HttpClientSpy } from '@/data/test'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'
import { HttpStatusCode } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with corret values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw Unexpected if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw Unexpected if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw Unexpected if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddAccount.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(httpResult)
  })
})
