export class PromiseCounter {
    constructor() {
        this.promiseCallbacks = [];
        this.validationCounter = 0;
        this.waitForCompletion = async () => {
            if (!this.validationCounter) {
                return;
            }
            let resolver = (resolve) => {
                this.promiseCallbacks.push(() => resolve());
            };
            return new Promise(resolver);
        };
        this.countPromise = async (promise) => {
            if (!promise) {
                return;
            }
            if (!promise.then) {
                throw new Error("Non-Promise pass in: " + promise);
            }
            this.incrementCounter();
            let result = await promise;
            this.decrementCounter();
            return result;
        };
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
