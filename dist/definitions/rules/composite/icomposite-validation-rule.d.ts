import { IModelResolver } from "../../resolvers/imodel-resolver";
export interface ICompositeValidationRule {
    propertyName: string;
    validate(modelResolver: IModelResolver): Promise<boolean>;
    getMessage(modelResolver: IModelResolver): string;
}
