import { SetStorageMock } from '@/data/test'
import { faker } from '@faker-js/faker'
import { LocalSaveAcessToken } from './local-save-access-token'

type SutType = {
  sut: LocalSaveAcessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutType => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAcessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessLocal', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.alphaNumeric()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
