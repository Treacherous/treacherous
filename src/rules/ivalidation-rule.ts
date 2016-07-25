import {ModelResolver} from "../model-resolver";
export interface IValidationRule
{
    ruleName: string;
    validate(mr:ModelResolver, propertName: string, options?: any): Promise<boolean>;
    getMessage(mr:ModelResolver, propertName: string, options?: any);
}