import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class AdvancedRegexValidationRule implements IValidationRule {
    ruleName: string;
    expression: string;
    message: (value: any) => string;
    constructor(ruleName: string, expression: string);
    validate(modelResolver: IModelResolver, propertyName: string, regexPattern: RegExp): Promise<boolean>;
}
