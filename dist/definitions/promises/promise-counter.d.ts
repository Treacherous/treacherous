export declare class PromiseCounter {
    private promiseCallbacks;
    private validationCounter;
    waitForCompletion: () => Promise<any>;
    countPromise: (promise: Promise<any>) => Promise<any>;
    private decrementCounter;
    private incrementCounter;
}
