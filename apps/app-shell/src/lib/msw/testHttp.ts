import { http, HttpResponse, RequestHandler } from 'msw';

const baseURL = process.env.NEXT_PUBLIC_BE || 'http://localhost:8080/';

class TestHttp {
  private handlers: RequestHandler[] = [];

  get(url: string, { statusCode = 200, data }: { statusCode?: number; data: any }) {
    this.handlers.push(
      http.get(`${baseURL}${url}`, () => {
        return HttpResponse.json({
          statusCode,
          metadata: {
            data
          }
        });
      })
    );
  }

  // post(url: string, data: any) {
  //   this.handlers.push(http.post(url, handler));
  // }

  // put(url: string, data: any) {
  //   this.handlers.push(http.put(url, handler));
  // }

  // delete(url: string, data: any) {
  //   this.handlers.push(http.delete(url, handler));
  // }

  getHandlers() {
    return this.handlers;
  }
}

const testHttp = new TestHttp();
const handlers = new TestHttp().getHandlers();

export { handlers, testHttp };
