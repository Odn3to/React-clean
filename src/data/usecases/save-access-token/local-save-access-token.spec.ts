import { SetStorageSpy } from '@/data/test'
import { faker } from '@faker-js/faker'
import { LocalSaveAcessToken } from './local-save-access-token'

type SutType = {
  sut: LocalSaveAcessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutType => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAcessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessLocal', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.alphaNumeric()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
