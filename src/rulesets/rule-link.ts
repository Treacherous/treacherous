export class RuleLink
{
    constructor(public ruleName: string, public ruleOptions?: any) {}
    public messageOverride: ((model: any, value: any, ruleOptions?: any) => string) | string;
    public appliesIf: (((model: any, value: any, ruleOptions?: any) => boolean) | boolean) = true;
}