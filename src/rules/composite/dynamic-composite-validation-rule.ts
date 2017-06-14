import {ICompositeValidationRule} from "./icomposite-validation-rule";
import {IModelResolver} from "../../resolvers/imodel-resolver";

export class DynamicCompositeValidationRule implements ICompositeValidationRule
{
    getMessage(modelResolver: IModelResolver): string {
        if(typeof(this.message) === "function")
        { return this.message(modelResolver); }
        else
        { return this.message; }
    }

    constructor(public virtualPropertyName: string, public validate: ICompositeValidationRule["validate"], private message: ICompositeValidationRule["getMessage"] | string){
    }
}