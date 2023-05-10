import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { type AddAccount } from '@/domain/usecases'
import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAddAccount.model>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
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
