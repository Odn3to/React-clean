import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { type AddAccount } from '@/domain/usecases'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAddAccount.model>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbiden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type model = AddAccount.Model
}
