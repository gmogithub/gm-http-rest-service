import { HttpMiddleware } from "../service/HttpRestService.type";
import { HttpRestService } from "../service/HttpRestService";
export declare class HttpRestServiceBuilder {
    private middlewareBefore;
    private middlewareSuccess;
    private middlewareError;
    private middlewareAfter;
    private baseUrl;
    private headers;
    withHeaders(headers: Headers): HttpRestServiceBuilder;
    withBaseUrl(baseUrl: string): HttpRestServiceBuilder;
    withMiddlewareBefore(middleware: Array<HttpMiddleware>): HttpRestServiceBuilder;
    withMiddlewareAfter(middleware: Array<HttpMiddleware>): HttpRestServiceBuilder;
    withMiddlewareSuccess(middleware: Array<HttpMiddleware>): HttpRestServiceBuilder;
    withMiddlewareError(middleware: Array<HttpMiddleware>): HttpRestServiceBuilder;
    build(): HttpRestService;
}
