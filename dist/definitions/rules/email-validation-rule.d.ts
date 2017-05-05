import { IModelResolver } from "../resolvers/imodel-resolver";
import { IValidationRule } from "./ivalidation-rule";
export declare class EmailValidationRule implements IValidationRule {
    ruleName: string;
    private emailRegex;
    validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string): string;
}
