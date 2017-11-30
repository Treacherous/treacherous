import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class MinValueValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, minValue: any): Promise<boolean>;
}
