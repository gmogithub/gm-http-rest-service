import { HttpRestService } from "./HttpRestService";

export type HttpMiddleware = (httpRest: HttpRestService, response: unknown, ...args: Array<any>) => any;

export interface HttpRestCacheOptions {
  duration: number // ms
  type?: "session" | "local" // default local
}

export interface HttpRestCacheRequest<P> {
  time: number,
  payload: P
}