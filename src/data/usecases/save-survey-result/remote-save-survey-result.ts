
import { type RemoteSurveyResultModel } from '@/data/models'
import { HttpStatusCode, type HttpClient } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise <SaveSurveyResult.Model> {
    const httpRespose = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    switch (httpRespose.statusCode) {
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
