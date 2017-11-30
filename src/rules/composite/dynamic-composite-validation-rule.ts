import {ICompositeValidationRule} from "./icomposite-validation-rule";
import {IModelResolver} from "../../resolvers/imodel-resolver";

export class DynamicCompositeValidationRule implements ICompositeValidationRule
{
    constructor(public virtualPropertyName: string, public validate: ICompositeValidationRule["validate"]){
    }
}