define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PromiseCounter = (function () {
        function PromiseCounter() {
            var _this = this;
            this.promiseCallbacks = [];
            this.validationCounter = 0;
            this.waitForCompletion = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var resolver;
                return tslib_1.__generator(this, function (_a) {
                    if (!this.validationCounter) {
                        return [2 /*return*/];
                    }
                    resolver = function (resolve) {
                        _this.promiseCallbacks.push(function () { return resolve(); });
                    };
                    return [2 /*return*/, new Promise(resolver)];
                });
            }); };
            this.countPromise = function (promise) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var result;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!promise) {
                                return [2 /*return*/];
                            }
                            if (!promise.then) {
                                throw new Error("Non-Promise pass in: " + promise);
                            }
                            this.incrementCounter();
                            return [4 /*yield*/, promise];
                        case 1:
                            result = _a.sent();
                            this.decrementCounter();
                            return [2 /*return*/, result];
                    }
                });
            }); };
            this.decrementCounter = function () {
                _this.validationCounter--;
                if (_this.validationCounter) {
                    return;
                }
                while (_this.promiseCallbacks.length) {
                    _this.promiseCallbacks.shift()();
                }
            };
            this.incrementCounter = function () { _this.validationCounter++; };
        }
        return PromiseCounter;
    }());
    exports.PromiseCounter = PromiseCounter;
});
