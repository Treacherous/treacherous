export declare class RuleLink {
    ruleName: string;
    ruleOptions: any;
    constructor(ruleName: string, ruleOptions?: any);
    messageOverride: ((value: any, ruleOptions?: any) => string) | string;
}
