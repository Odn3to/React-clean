import { type Authentication } from './../../../domain/usecases/authentication'

import { type HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-errors'
import { UnexpectedError } from '@/domain/errors/unexpectedError'
import { type AccountModel } from '@/domain/models/account-modal'
import { type AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      /* eslint-disable */
      case HttpStatusCode.ok: return httpResponse.body
      /* eslint-enable */
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
