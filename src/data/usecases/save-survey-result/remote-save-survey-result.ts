
import { type RemoteSurveyResultModel } from '@/data/models'
import { type HttpClient } from '@/data/protocols/http'
import { type SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise <SaveSurveyResult.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    return null
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
