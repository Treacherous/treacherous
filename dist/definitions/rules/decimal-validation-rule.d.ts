import { IModelResolver } from "../resolvers/imodel-resolver";
import { IValidationRule } from "./ivalidation-rule";
export declare class DecimalValidationRule implements IValidationRule {
    ruleName: string;
    private decimalRegex;
    validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>;
}
