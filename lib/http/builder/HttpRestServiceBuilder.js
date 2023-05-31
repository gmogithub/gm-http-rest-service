"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRestServiceBuilder = void 0;
var HttpRestService_1 = require("../service/HttpRestService");
var HttpRestServiceBuilder = /** @class */ (function () {
    function HttpRestServiceBuilder() {
        this.middlewareBefore = [];
        this.middlewareSuccess = [];
        this.middlewareError = [];
        this.middlewareAfter = [];
        this.baseUrl = '';
        this.headers = null;
    }
    HttpRestServiceBuilder.prototype.withHeaders = function (headers) {
        this.headers = headers;
        return this;
    };
    HttpRestServiceBuilder.prototype.withBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    };
    HttpRestServiceBuilder.prototype.withMiddlewareBefore = function (middleware) {
        this.middlewareBefore = middleware;
        return this;
    };
    HttpRestServiceBuilder.prototype.withMiddlewareAfter = function (middleware) {
        this.middlewareAfter = middleware;
        return this;
    };
    HttpRestServiceBuilder.prototype.withMiddlewareSuccess = function (middleware) {
        this.middlewareSuccess = middleware;
        return this;
    };
    HttpRestServiceBuilder.prototype.withMiddlewareError = function (middleware) {
        this.middlewareError = middleware;
        return this;
    };
    HttpRestServiceBuilder.prototype.build = function () {
        var httpRestService = new HttpRestService_1.HttpRestService();
        httpRestService.setBaseUrl(this.baseUrl);
        httpRestService.setMiddlewareBefore(this.middlewareBefore);
        httpRestService.setMiddlewareSuccess(this.middlewareSuccess);
        httpRestService.setMiddlewareError(this.middlewareError);
        httpRestService.setMiddlewareAfter(this.middlewareAfter);
        if (this.headers !== null) {
            httpRestService.setHeaders(this.headers);
        }
        return httpRestService;
    };
    return HttpRestServiceBuilder;
}());
exports.HttpRestServiceBuilder = HttpRestServiceBuilder;
