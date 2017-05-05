import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class RegexValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): string;
}
