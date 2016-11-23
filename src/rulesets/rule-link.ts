import {IModelResolver} from "../resolvers/imodel-resolver";

export class RuleLink
{
    constructor(public ruleName: string, public ruleOptions?: any) {}
    public messageOverride: ((model: any, value: any, ruleOptions?: any) => string) | string;
    public appliesIf: (((modelResolver: IModelResolver, value: any, ruleOptions?: any) => boolean) | boolean) = true;
}