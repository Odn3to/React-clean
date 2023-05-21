import { faker } from '@faker-js/faker'
import { HttpStatusCode, type HttpResponse , type HttpRequest, type HttpClient } from '@/data/protocols/http'

const methods = ['get', 'post', 'put', 'delete']
const randomIndex = faker.datatype.number({ min: 0, max: methods.length - 1 })

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: methods[randomIndex],
  body: faker.random.words(),
  headers: faker.random.words()
})

export class HttpClientSpy<R= any> implements HttpClient <R> {
  url: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return this.response
  }
}
