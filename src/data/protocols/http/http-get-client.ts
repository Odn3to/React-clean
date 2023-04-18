import { type HttpResponse } from '.'

export interface HttpGetClient <R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}

export type HttpGetParams = {
  url: string
}
