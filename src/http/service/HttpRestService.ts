import { HttpMiddleware, HttpRestCacheOptions, HttpRestCacheRequest } from "./HttpRestService.type";
import { ErrorResponse } from "../response/ErrorResponse";
import { sha256 } from "../../utils/utils";
import { StorageManager } from "../../tools/StorageManager";

export enum HttpActionEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  UPLOAD = "UPLOAD",
  DOWNLOAD = "DOWNLOAD",
  LOAD = "LOAD"
}

export enum HttpMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum HttpCacheDuration {
  ONE_MINUTE = 60000,
  FIVE_MINUTES = 300000,
  TEN_MINUTES = 600000,
  THIRTY_MINUTES = 1800000,
  ONE_HOUR = 3600000,
  TWO_HOURS = 7200000,
  ONE_DAY = 86400000
}

export class HttpRestService {
  static HEADERS_JSON = () => new Headers({
    'Content-Type': 'application/json;charset=UTF-8'
  });

  static HEADERS_UPLOAD = () => new Headers();
  static HEADERS_DOWNLOAD = () => new Headers();
  static HEADERS_LOAD = () => new Headers();

  private middlewareBefore: Array<HttpMiddleware> = [];
  private middlewareSuccess: Array<HttpMiddleware> = [];
  private middlewareError: Array<HttpMiddleware> = [];
  private middlewareAfter: Array<HttpMiddleware> = [];
  public headers: Headers = HttpRestService.HEADERS_JSON();
  private baseUrl: string = '';
  private cacheOptions: HttpRestCacheOptions | null = null;

  public setHeaders(headers: Headers) {
    this.headers = headers;
  }

  public setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public setMiddlewareBefore(middlewareList: Array<HttpMiddleware>): void {
    this.middlewareBefore = middlewareList;
  }

  public setMiddlewareSuccess(middlewareList: Array<HttpMiddleware>): void {
    this.middlewareSuccess = middlewareList;
  }

  public setMiddlewareError(middlewareList: Array<HttpMiddleware>): void {
    this.middlewareError = middlewareList;
  }

  public setMiddlewareAfter(middlewareList: Array<HttpMiddleware>): void {
    this.middlewareAfter = middlewareList;
  }

  public get<T = any>(api: string): Promise<T> {
    return this.send<T>(api, HttpActionEnum.GET);
  }

  public post<T = any>(api: string, body?: any): Promise<T> {
    return this.send<T>(api, HttpActionEnum.POST, body);
  }

  public put<T = any>(api: string, body?: any): Promise<T> {
    return this.send<T>(api, HttpActionEnum.PUT, body);
  }

  public delete<T = any>(api: string, body?: any): Promise<T> {
    return this.send<T>(api, HttpActionEnum.DELETE, body);
  }

  public upload<T = any>(api: string, body?: any): Promise<T> {
    return this.send<T>(api, HttpActionEnum.UPLOAD, body);
  }

  public download<T = any>(api: string): Promise<T> {
    return this.send<T>(api, HttpActionEnum.DOWNLOAD);
  }

  public load<T = any>(api: string): Promise<T> {
    return this.send<T>(api, HttpActionEnum.LOAD);
  }

  public cache(options: HttpRestCacheOptions): HttpRestService {
    this.cacheOptions = options;
    return this;
  }

  private getHeader(action: HttpActionEnum): Headers {
    if (this.headers !== null) {
      return this.headers;
    }
    switch (action) {
      case HttpActionEnum.UPLOAD:
        return HttpRestService.HEADERS_UPLOAD();
      case HttpActionEnum.DOWNLOAD:
        return HttpRestService.HEADERS_DOWNLOAD();
      case HttpActionEnum.LOAD:
        return HttpRestService.HEADERS_LOAD();
      case HttpActionEnum.GET:
      case HttpActionEnum.POST:
      case HttpActionEnum.PUT:
      case HttpActionEnum.DELETE:
        return HttpRestService.HEADERS_JSON();
      default:
        return HttpRestService.HEADERS_JSON();
    }
  }

  private async send<T = any>(api: string, action: HttpActionEnum, body: any = null): Promise<T> {
    const headers = this.getHeader(action);
    this.headers = headers;
    const method: HttpMethodEnum = HttpRestService.getMethodByAction(action);

    const cacheOptions = this.cacheOptions;
    const keyCache = cacheOptions !== null ? await sha256(api + "_" + action + "_" + (body ? JSON.stringify(body) : "")) : null;

    if (cacheOptions !== null && keyCache !== null) {
      const storage = new StorageManager(cacheOptions.type === "session" ? StorageManager.SESSION : StorageManager.LOCAL);
      if (storage.exist(keyCache)) {
        const store = storage.getJson(keyCache) as HttpRestCacheRequest<T>;
        const time = store.time + cacheOptions.duration;
        const now = new Date().getTime();
        if (time > now) {
          return store.payload;
        }
      }
    }

    const init = {
      method,
      headers,
      body: null
    };

    await this.launchMiddleware(this.middlewareBefore, null, api, method, body);
    if (body != null) {
      if (body instanceof Object)
        init.body = action === HttpActionEnum.UPLOAD ? body : JSON.stringify(body);
      else
        init.body = body;
    }
    const url = this.buildUrl(api);

    const response = fetch(url, init)
      .then((res) => this.checkStatus(res, api, method, body))
      .finally(async () => {
        return await this.launchMiddleware(this.middlewareAfter, null, api, method, body)
      });

    if (cacheOptions && keyCache !== null) {
      if (action === HttpActionEnum.GET) {
        response.then(r => {
          const storage = new StorageManager(cacheOptions.type === "session" ? StorageManager.SESSION : StorageManager.LOCAL);
          storage.storeObject(keyCache, {
            time: new Date().getTime(),
            payload: r
          })
        });
      } else {
        throw new Error("Cache is only allowed for HTTP GET requests : " + api);
      }
    }

    return response;
  }

  private async checkStatus(response: Response, api: string, method: string, body: any) {
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType !== null && contentType.indexOf("application/json") > -1;
    let resJson = isJson ? await response.json() : response;

    if (response.ok) {
      resJson = await this.launchMiddleware(this.middlewareSuccess, resJson, api, method, body);
    } else {
      resJson = await this.launchMiddleware(this.middlewareError, resJson, api, method, body);
    }
    return resJson;
  }

  private static getMethodByAction(action: HttpActionEnum): HttpMethodEnum {
    switch (action) {
      case HttpActionEnum.UPLOAD:
      case HttpActionEnum.POST:
        return HttpMethodEnum.POST;
      case HttpActionEnum.DOWNLOAD:
      case HttpActionEnum.LOAD:
      case HttpActionEnum.GET:
        return HttpMethodEnum.GET;
      case HttpActionEnum.DELETE:
        return HttpMethodEnum.DELETE;
      case HttpActionEnum.PUT:
        return HttpMethodEnum.PUT;
      default:
        return HttpMethodEnum.GET;
    }
  }

  private async launchMiddleware<T = null>(middlewareList: Array<HttpMiddleware>, res: T, ...args: Array<any>): Promise<any> {
    for (const middleware of middlewareList) {
      try {
        res = await middleware(this, res, ...args);
      } catch (e) {
        console.error(e);
      }
    }
    return res;
  }

  private buildUrl(api: string) {
    if (!api.startsWith('/')) {
      api = `/${api}`;
    }
    return `${this.baseUrl}${api}`;
  }

}
