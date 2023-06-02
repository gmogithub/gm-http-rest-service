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
    get<T = any>(api: string): Promise<T>;
    post<T = any>(api: string, body?: any): Promise<T>;
    put<T = any>(api: string, body?: any): Promise<T>;
    delete<T = any>(api: string, body?: any): Promise<T>;
    upload<T = any>(api: string, body?: any): Promise<T>;
    download<T = any>(api: string): Promise<T>;
    load<T = any>(api: string): Promise<T>;
    private getHeader;
    private send;
    private checkStatus;
    private static getMethodByAction;
    private launchMiddleware;
    private buildUrl;
}
