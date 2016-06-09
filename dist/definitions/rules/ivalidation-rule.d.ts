import * as Promise from "bluebird";
export interface IValidationRule {
    ruleName: string;
    validate(value: any, options?: any): Promise<boolean>;
    getMessage(value: any, options?: any): any;
}
