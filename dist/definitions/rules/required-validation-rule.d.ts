import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class RequiredValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, isRequired?: boolean): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, isRequired: boolean): string;
}
