import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class StepValidationRule implements IValidationRule {
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, step: number): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, step: number): string;
}
