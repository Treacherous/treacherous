export class RuleLink
{
    constructor(public ruleName: string, public ruleOptions?: any) {}
    public messageOverride: ((value: any, ruleOptions?: any) => string) | string;
    public appliesIf: (((value: any, ruleOptions?: any, reason?: number) => boolean) | boolean) = true;
}