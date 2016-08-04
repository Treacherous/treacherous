import { IModelResolver } from "../resolvers/imodel-resolver";
import { IValidationRule } from "./ivalidation-rule";
export declare class ISODateValidationRule implements IValidationRule {
    ruleName: string;
    private isoDateRegex;
    validate(modelResolver: IModelResolver, propertyName: string): Promise<boolean>;
    getMessage(modelResolver: IModelResolver, propertyName: string): string;
}
