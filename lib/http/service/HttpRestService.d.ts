import { HttpMiddleware } from "./HttpRestService.type";
export declare enum HttpActionEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    UPLOAD = "UPLOAD",
    DOWNLOAD = "DOWNLOAD",
    LOAD = "LOAD"
}
export declare enum HttpMethodEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare class HttpRestService {
    static HEADERS_JSON: () => Headers;
    static HEADERS_UPLOAD: () => Headers;
    static HEADERS_DOWNLOAD: () => Headers;
    static HEADERS_LOAD: () => Headers;
    private middlewareBefore;
    private middlewareSuccess;
    private middlewareError;
    private middlewareAfter;
    headers: Headers;
    private baseUrl;
    setHeaders(headers: Headers): void;
    setBaseUrl(baseUrl: string): void;
    setMiddlewareBefore(middlewareList: Array<HttpMiddleware>): void;
    setMiddlewareSuccess(middlewareList: Array<HttpMiddleware>): void;
    setMiddlewareError(middlewareList: Array<HttpMiddleware>): void;
    setMiddlewareAfter(middlewareList: Array<HttpMiddleware>): void;
    private getHeader;
    private send;
    private checkStatus;
    private static getMethodByAction;
    private launchMiddleware;
    private buildUrl;
}
