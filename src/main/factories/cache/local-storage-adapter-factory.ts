import { LocalStorageAdapter } from './../../../infra/cache/local-storage-adapter'
import { type SetStorage } from '@/data/protocols/cache/set-storage'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
