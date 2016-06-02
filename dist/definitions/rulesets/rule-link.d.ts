export declare class RuleLink {
    ruleName: string;
    ruleOptions: any;
    messageOverride: (value: any, ruleOptions?: any) => string | string;
    constructor(ruleName: string, ruleOptions: any, messageOverride?: (value: any, ruleOptions?: any) => string | string);
}
