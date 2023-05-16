import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { type HttpGetClient } from './../../protocols/http/http-get-client'
import { HttpStatusCode } from '@/data/protocols/http'
import { type LoadSurveyResult } from '@/domain/usecases'
export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async load (): Promise <LoadSurveyResult.Model> {
    const httpRespose = await this.httpGetClient.get({ url: this.url })
    const remoteSurveyResult = httpRespose.body
    switch (httpRespose.statusCode) {
      case HttpStatusCode.ok: return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date) })
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
