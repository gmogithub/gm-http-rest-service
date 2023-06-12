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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRestService = exports.HttpMethodEnum = exports.HttpActionEnum = void 0;
var ErrorResponse_1 = require("../response/ErrorResponse");
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
var HttpRestService = exports.HttpRestService = /** @class */ (function () {
    function HttpRestService() {
        this.middlewareBefore = [];
        this.middlewareSuccess = [];
        this.middlewareError = [];
        this.middlewareAfter = [];
        this.headers = HttpRestService.HEADERS_JSON();
        this.baseUrl = '';
    }
    HttpRestService.prototype.setHeaders = function (headers) {
        this.headers = headers;
    };
    HttpRestService.prototype.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };
    HttpRestService.prototype.setMiddlewareBefore = function (middlewareList) {
        this.middlewareBefore = middlewareList;
    };
    HttpRestService.prototype.setMiddlewareSuccess = function (middlewareList) {
        this.middlewareSuccess = middlewareList;
    };
    HttpRestService.prototype.setMiddlewareError = function (middlewareList) {
        this.middlewareError = middlewareList;
    };
    HttpRestService.prototype.setMiddlewareAfter = function (middlewareList) {
        this.middlewareAfter = middlewareList;
    };
    HttpRestService.prototype.get = function (api) {
        return this.send(api, HttpActionEnum.GET);
    };
    HttpRestService.prototype.post = function (api, body) {
        return this.send(api, HttpActionEnum.POST, body);
    };
    HttpRestService.prototype.put = function (api, body) {
        return this.send(api, HttpActionEnum.PUT, body);
    };
    HttpRestService.prototype.delete = function (api, body) {
        return this.send(api, HttpActionEnum.DELETE, body);
    };
    HttpRestService.prototype.upload = function (api, body) {
        return this.send(api, HttpActionEnum.UPLOAD, body);
    };
    HttpRestService.prototype.download = function (api) {
        return this.send(api, HttpActionEnum.DOWNLOAD);
    };
    HttpRestService.prototype.load = function (api) {
        return this.send(api, HttpActionEnum.LOAD);
    };
    HttpRestService.prototype.getHeader = function (action) {
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
    };
    HttpRestService.prototype.send = function (api, action, body) {
        if (body === void 0) { body = null; }
        return __awaiter(this, void 0, void 0, function () {
            var headers, method, init, url;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this.getHeader(action);
                        this.headers = headers;
                        method = HttpRestService.getMethodByAction(action);
                        init = {
                            method: method,
                            headers: headers,
                            body: null
                        };
                        return [4 /*yield*/, this.launchMiddleware(this.middlewareBefore, null, api, method, body)];
                    case 1:
                        _a.sent();
                        if (body != null) {
                            if (body instanceof Object)
                                init.body = action === HttpActionEnum.UPLOAD ? body : JSON.stringify(body);
                            else
                                init.body = body;
                        }
                        url = this.buildUrl(api);
                        return [2 /*return*/, fetch(url, init)
                                .then(function (res) { return _this.checkStatus(res, api, method, body); })
                                .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.launchMiddleware(this.middlewareError, error.response, error, api, method, body)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .finally(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.launchMiddleware(this.middlewareAfter, null, api, method, body)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    HttpRestService.prototype.checkStatus = function (response, api, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, isJson, resJson, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentType = response.headers.get('Content-Type');
                        isJson = contentType !== null && contentType.indexOf("application/json") > -1;
                        if (!isJson) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json()];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = response;
                        _b.label = 3;
                    case 3:
                        resJson = _a;
                        if (!response.ok) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.launchMiddleware(this.middlewareSuccess, resJson, api, method, body)];
                    case 4:
                        resJson = _b.sent();
                        return [3 /*break*/, 6];
                    case 5: 
                    // throw new ApiResponseError(apiResponse, resJson.message);
                    throw new ErrorResponse_1.ErrorResponse(resJson);
                    case 6: return [2 /*return*/, resJson];
                }
            });
        });
    };
    HttpRestService.getMethodByAction = function (action) {
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
    };
    HttpRestService.prototype.launchMiddleware = function (middlewareList, res) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, middlewareList_1, middleware, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = 0, middlewareList_1 = middlewareList;
                        _b.label = 1;
                    case 1:
                        if (!(_a < middlewareList_1.length)) return [3 /*break*/, 6];
                        middleware = middlewareList_1[_a];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, middleware.apply(void 0, __spreadArray([this, res], args, false))];
                    case 3:
                        res = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5:
                        _a++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, res];
                }
            });
        });
    };
    HttpRestService.prototype.buildUrl = function (api) {
        if (!api.startsWith('/')) {
            api = "/".concat(api);
        }
        return "".concat(this.baseUrl).concat(api);
    };
    HttpRestService.HEADERS_JSON = function () { return new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
    }); };
    HttpRestService.HEADERS_UPLOAD = function () { return new Headers(); };
    HttpRestService.HEADERS_DOWNLOAD = function () { return new Headers(); };
    HttpRestService.HEADERS_LOAD = function () { return new Headers(); };
    return HttpRestService;
}());
