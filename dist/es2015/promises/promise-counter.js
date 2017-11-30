import * as tslib_1 from "tslib";
export class PromiseCounter {
    constructor() {
        this.promiseCallbacks = [];
        this.validationCounter = 0;
        this.waitForCompletion = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.validationCounter) {
                return;
            }
            const resolver = (resolve) => {
                this.promiseCallbacks.push(() => resolve());
            };
            return new Promise(resolver);
        });
        this.countPromise = (promise) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!promise) {
                return;
            }
            if (!promise.then) {
                throw new Error("Non-Promise pass in: " + promise);
            }
            this.incrementCounter();
            const result = yield promise;
            this.decrementCounter();
            return result;
        });
        this.decrementCounter = () => {
            this.validationCounter--;
            if (this.validationCounter) {
                return;
            }
            while (this.promiseCallbacks.length) {
                this.promiseCallbacks.shift()();
            }
        };
        this.incrementCounter = () => { this.validationCounter++; };
    }
}
