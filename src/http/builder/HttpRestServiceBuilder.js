"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRestServiceBuilder = void 0;
const HttpRestService_1 = require("../service/HttpRestService");
class HttpRestServiceBuilder {
    constructor() {
        this.middlewareBefore = [];
        this.middlewareSuccess = [];
        this.middlewareError = [];
        this.middlewareAfter = [];
        this.baseUrl = '';
        this.headers = null;
    }
    withHeaders(headers) {
        this.headers = headers;
        return this;
    }
    withBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }
    withMiddlewareBefore(middleware) {
        this.middlewareBefore = middleware;
        return this;
    }
    withMiddlewareAfter(middleware) {
        this.middlewareAfter = middleware;
        return this;
    }
    withMiddlewareSuccess(middleware) {
        this.middlewareSuccess = middleware;
        return this;
    }
    withMiddlewareError(middleware) {
        this.middlewareError = middleware;
        return this;
    }
    build() {
        const httpRestService = new HttpRestService_1.HttpRestService();
        httpRestService.setBaseUrl(this.baseUrl);
        httpRestService.setMiddlewareBefore(this.middlewareBefore);
        httpRestService.setMiddlewareSuccess(this.middlewareSuccess);
        httpRestService.setMiddlewareError(this.middlewareError);
        httpRestService.setMiddlewareAfter(this.middlewareAfter);
        if (this.headers !== null) {
            httpRestService.setHeaders(this.headers);
        }
        return httpRestService;
    }
}
exports.HttpRestServiceBuilder = HttpRestServiceBuilder;
