import { IValidationRule } from "./ivalidation-rule";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class MatchesValidationRule implements IValidationRule {
    ruleName: string;
    constructor();
    validate(modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any): string;
}
