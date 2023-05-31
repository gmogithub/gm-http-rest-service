"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRestService = exports.HttpMethodEnum = exports.HttpActionEnum = void 0;
var HttpActionEnum;
(function (HttpActionEnum) {
    HttpActionEnum["GET"] = "GET";
    HttpActionEnum["POST"] = "POST";
    HttpActionEnum["PUT"] = "PUT";
    HttpActionEnum["DELETE"] = "DELETE";
    HttpActionEnum["UPLOAD"] = "UPLOAD";
    HttpActionEnum["DOWNLOAD"] = "DOWNLOAD";
    HttpActionEnum["LOAD"] = "LOAD";
})(HttpActionEnum = exports.HttpActionEnum || (exports.HttpActionEnum = {}));
var HttpMethodEnum;
(function (HttpMethodEnum) {
    HttpMethodEnum["GET"] = "GET";
    HttpMethodEnum["POST"] = "POST";
    HttpMethodEnum["PUT"] = "PUT";
    HttpMethodEnum["DELETE"] = "DELETE";
})(HttpMethodEnum = exports.HttpMethodEnum || (exports.HttpMethodEnum = {}));
class HttpRestService {
    constructor() {
        this.middlewareBefore = [];
        this.middlewareSuccess = [];
        this.middlewareError = [];
        this.middlewareAfter = [];
        this.headers = HttpRestService.HEADERS_JSON();
        this.baseUrl = '';
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    setMiddlewareBefore(middlewareList) {
        this.middlewareBefore = middlewareList;
    }
    setMiddlewareSuccess(middlewareList) {
        this.middlewareSuccess = middlewareList;
    }
    setMiddlewareError(middlewareList) {
        this.middlewareError = middlewareList;
    }
    setMiddlewareAfter(middlewareList) {
        this.middlewareAfter = middlewareList;
    }
    getHeader(action) {
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
    send(api, action, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = this.getHeader(action);
            this.headers = headers;
            const method = HttpRestService.getMethodByAction(action);
            const init = {
                method,
                headers,
                body: null
            };
            yield this.launchMiddleware(this.middlewareBefore, null, api, method, body);
            if (body != null) {
                if (body instanceof Object)
                    init.body = action === HttpActionEnum.UPLOAD ? body : JSON.stringify(body);
                else
                    init.body = body;
            }
            const url = this.buildUrl(api);
            return fetch(url, init)
                .then((res) => this.checkStatus(res, api, method, body))
                .catch((error) => __awaiter(this, void 0, void 0, function* () {
                return yield this.launchMiddleware(this.middlewareError, error.response, error, api, method, body);
            }))
                .finally(() => __awaiter(this, void 0, void 0, function* () {
                return yield this.launchMiddleware(this.middlewareAfter, null, api, method, body);
            }));
        });
    }
    checkStatus(response, api, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentType = response.headers.get('Content-Type');
            const isJson = contentType !== null && contentType.indexOf("application/json") > -1;
            let resJson = isJson ? yield response.json() : response;
            if (response.ok) {
                resJson = yield this.launchMiddleware(this.middlewareSuccess, resJson, api, method, body);
            }
            else {
                // throw new ApiResponseError(apiResponse, resJson.message);
                throw new Error();
            }
            return resJson;
        });
    }
    static getMethodByAction(action) {
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
    launchMiddleware(middlewareList, res, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const middleware of middlewareList) {
                try {
                    res = yield middleware(this, res, ...args);
                }
                catch (e) {
                    console.error(e);
                }
            }
            return res;
        });
    }
    buildUrl(api) {
        if (!api.startsWith('/')) {
            api = `/${api}`;
        }
        return `${this.baseUrl}${api}`;
    }
}
HttpRestService.HEADERS_JSON = () => new Headers({
    'Content-Type': 'application/json;charset=UTF-8'
});
HttpRestService.HEADERS_UPLOAD = () => new Headers();
HttpRestService.HEADERS_DOWNLOAD = () => new Headers();
HttpRestService.HEADERS_LOAD = () => new Headers();
exports.HttpRestService = HttpRestService;
