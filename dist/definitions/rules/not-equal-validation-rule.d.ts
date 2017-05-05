import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class NotEqualValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, optionsOrValue: any): string;
}
