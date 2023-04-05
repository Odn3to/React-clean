import { EmailInUseError } from '@/domain/errors/email-in-use-error'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/usecases'
import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
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
