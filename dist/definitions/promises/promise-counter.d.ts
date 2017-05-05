export declare class PromiseCounter {
    private activePromises;
    private validationCounter;
    waitForCompletion: () => Promise<{}>;
    countPromise: (promise: Promise<any>) => Promise<any>;
    private decrementCounter;
    private incrementCounter;
}
