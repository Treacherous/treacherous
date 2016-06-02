export interface IValidationRule
{
    ruleName: string;
    validate(value, options?: any): Promise<boolean>;
    getMessage(value, options?: any);
}