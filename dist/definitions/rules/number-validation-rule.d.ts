import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class NumberValidationRule implements IValidationRule {
    ruleName: string;
    private numberRegex;
    validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string): string;
}
