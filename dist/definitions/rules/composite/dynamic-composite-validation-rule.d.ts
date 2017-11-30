import { ICompositeValidationRule } from "./icomposite-validation-rule";
export declare class DynamicCompositeValidationRule implements ICompositeValidationRule {
    virtualPropertyName: string;
    validate: ICompositeValidationRule["validate"];
    constructor(virtualPropertyName: string, validate: ICompositeValidationRule["validate"]);
}
