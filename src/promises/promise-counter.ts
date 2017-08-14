export class PromiseCounter
{
    private promiseCallbacks: Array<Function> = [];
    private validationCounter = 0;

    public waitForCompletion = async() : Promise<any> => {
        if(!this.validationCounter) { return; }

        let resolver = (resolve: Function) => {
            this.promiseCallbacks.push(() => resolve());
        };
        return new Promise(resolver);
    }

    public countPromise = async(promise: Promise<any>) => {
        if(!promise) { return; }
        if(!promise.then) { throw new Error("Non-Promise pass in: " + promise) }

        this.incrementCounter();
        let result = await promise;
        this.decrementCounter();
        return result;
    }

    private decrementCounter = () => {
        this.validationCounter--;
        if(this.validationCounter) { return; }

        while (this.promiseCallbacks.length)
        { this.promiseCallbacks.shift()(); }
    }

    private incrementCounter = () => { this.validationCounter++; }
}