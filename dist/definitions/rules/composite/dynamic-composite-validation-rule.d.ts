import { ICompositeValidationRule } from "./icomposite-validation-rule";
export declare class DynamicCompositeValidationRule implements ICompositeValidationRule {
    propertyName: string;
    validate: ICompositeValidationRule["validate"];
    getMessage: ICompositeValidationRule["getMessage"];
    constructor(propertyName: string, validate: ICompositeValidationRule["validate"], getMessage: ICompositeValidationRule["getMessage"]);
}
