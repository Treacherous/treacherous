import { ModelHelper } from "../model-helper";
export interface IValidationRule {
    ruleName: string;
    validate(mr: ModelHelper, propertName: string, options?: any): Promise<boolean>;
    getMessage(mr: ModelHelper, propertName: string, options?: any): any;
}
