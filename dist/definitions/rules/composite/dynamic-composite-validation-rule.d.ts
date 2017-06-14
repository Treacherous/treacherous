import { ICompositeValidationRule } from "./icomposite-validation-rule";
import { IModelResolver } from "../../resolvers/imodel-resolver";
export declare class DynamicCompositeValidationRule implements ICompositeValidationRule {
    propertyName: string;
    validate: ICompositeValidationRule["validate"];
    private message;
    getMessage(modelResolver: IModelResolver): string;
    constructor(propertyName: string, validate: ICompositeValidationRule["validate"], message: ICompositeValidationRule["getMessage"] | string);
}
