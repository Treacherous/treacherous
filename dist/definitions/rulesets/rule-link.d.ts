import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class RuleLink {
    ruleName: string;
    ruleOptions?: any;
    constructor(ruleName: string, ruleOptions?: any);
    messageOverride: ((model: any, value: any, ruleOptions?: any) => string) | string;
    appliesIf: (((modelResolver: IModelResolver, value: any, ruleOptions?: any) => boolean) | boolean);
}
