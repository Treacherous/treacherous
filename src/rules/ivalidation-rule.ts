import {IModelResolver} from "../resolvers/imodel-resolver";
export interface IValidationRule
{
    ruleName: string;
    validate(modelResolver: IModelResolver, propertyName: string, options?: any): Promise<boolean>;
}