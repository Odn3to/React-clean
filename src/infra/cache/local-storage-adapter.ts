import { type SetStorage, type GetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements GetStorage, SetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }
}
