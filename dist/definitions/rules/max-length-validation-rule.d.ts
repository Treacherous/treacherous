import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class MaxLengthValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, maxLength: number): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, maxLength: any): string;
}
