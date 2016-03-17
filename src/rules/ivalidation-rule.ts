import * as Promise from "bluebird";

export interface IValidationRule
{
    ruleName: string;
    validate(value, options?: any): Promise<boolean>;
    getMessage(value, options?: any);
}