import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class DateValidationRule implements IValidationRule {
    ruleName: string;
    private invalidObjectRegex;
    validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string): string;
}
