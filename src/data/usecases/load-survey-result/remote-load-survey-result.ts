import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { type LoadSurveyResult } from '@/domain/usecases'
import { type RemoteSurveyResultModel } from '@/data/models'
export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load (): Promise <LoadSurveyResult.Model> {
    const httpRespose = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const remoteSurveyResult = httpRespose.body
    switch (httpRespose.statusCode) {
      case HttpStatusCode.ok: return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date) })
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = RemoteSurveyResultModel
}
