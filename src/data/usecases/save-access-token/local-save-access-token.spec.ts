import { SetStorageSpy } from '@/data/test'
import { faker } from '@faker-js/faker'
import { LocalSaveAcessToken } from './local-save-access-token'

describe('LocalSaveAccessLocal', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAcessToken(setStorageSpy)
    const accessToken = faker.random.alphaNumeric()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
