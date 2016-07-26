export interface IValidationRule
{
    ruleName: string;
    validate(model: any, value: any, options?: any): Promise<boolean>;
    getMessage(model: any, value: any, options?: any);
}