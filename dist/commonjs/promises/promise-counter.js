"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromiseCounter = (function () {
    function PromiseCounter() {
        var _this = this;
        this.activePromises = [];
        this.validationCounter = 0;
        this.waitForCompletion = function () {
            var resolver = function (resolve) {
                _this.validationCounter ? _this.activePromises.push(function () { return resolve(); }) : resolve();
            };
            return new Promise(resolver);
        };
        this.countPromise = function (promise) {
            if (!promise) {
                return Promise.resolve(undefined);
            }
            if (!promise.then) {
                throw new Error("Non-Promise pass in: " + promise);
            }
            _this.incrementCounter();
            var resolver = function (resolve) {
                _this.decrementCounter();
                return resolve;
            };
            var rejecter = function (reject) {
                _this.decrementCounter();
                throw reject;
            };
            return promise.then(resolver, rejecter);
        };
        this.decrementCounter = function () {
            _this.validationCounter--;
            if (!_this.validationCounter) {
                while (_this.activePromises.length) {
                    _this.activePromises.shift()();
                }
            }
        };
        this.incrementCounter = function () { _this.validationCounter++; };
    }
    return PromiseCounter;
}());
exports.PromiseCounter = PromiseCounter;
