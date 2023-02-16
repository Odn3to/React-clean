import { HttpPostClientSpy } from '../../protocols/test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import { faker } from '@faker-js/faker'
import { mockAuthentication } from '../../../domain/test/mock-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with corret URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('Should call HttpPostClient with corret body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const autheticationParams = mockAuthentication()
    await sut.auth(autheticationParams)
    expect(httpPostClientSpy.body).toEqual(autheticationParams)
  })
})
