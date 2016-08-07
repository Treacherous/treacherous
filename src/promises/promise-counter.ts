export class PromiseCounter
{
    private activePromises = [];
    private validationCounter = 0;

    public waitForCompletion = () => {
        var resolver = (resolve) => {
            this.validationCounter ? this.activePromises.push(() => resolve() ) : resolve()
        };

        return new Promise(resolver);
    }

    public countPromise = (promise: Promise<any>) => {
        if(!promise) { return Promise.resolve(undefined); }
        if(!promise.then) { throw new Error("Non-Promise pass in: " + promise) }

        this.incrementCounter();

        var resolver = (resolve) => {
            this.decrementCounter();
            return resolve;
        }

        var rejecter = (reject) => {
            this.decrementCounter();
            throw reject;
        };

        return promise.then(resolver, rejecter);
    }

    private decrementCounter = () => { this.validationCounter--;
        if (!this.validationCounter) {
            while (this.activePromises.length) {
                this.activePromises.shift()();
            }
        }
    }

    private incrementCounter = () => { this.validationCounter++; }

}