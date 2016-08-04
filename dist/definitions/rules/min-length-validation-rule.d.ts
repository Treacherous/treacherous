import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class MinLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, minLength: any): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, minLength: any): string;
}
