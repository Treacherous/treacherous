import { ICompositeValidationRule } from "./icomposite-validation-rule";
import { IModelResolver } from "../../resolvers/imodel-resolver";
export declare class DynamicCompositeValidationRule implements ICompositeValidationRule {
    virtualPropertyName: string;
    validate: ICompositeValidationRule["validate"];
    private message;
    getMessage(modelResolver: IModelResolver): string;
    constructor(virtualPropertyName: string, validate: ICompositeValidationRule["validate"], message: ICompositeValidationRule["getMessage"] | string);
}
