import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class MinLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, minLength: number): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, minLength: number): string;
}
