import { AccessDeniedError } from '@/domain/errors'
import { type HttpGetClient } from './../../protocols/http/http-get-client'
import { HttpStatusCode } from '@/data/protocols/http'
export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise <void> {
    const httpRespose = await this.httpGetClient.get({ url: this.url })
    switch (httpRespose.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new AccessDeniedError()
    }
  }
}
