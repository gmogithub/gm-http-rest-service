import { HttpRestService } from "./HttpRestService";

export type HttpMiddleware = (httpRest: HttpRestService, response: unknown, ...args: Array<any>) => any;
