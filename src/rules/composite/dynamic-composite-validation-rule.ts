import {ICompositeValidationRule} from "./icomposite-validation-rule";

export class DynamicCompositeValidationRule implements ICompositeValidationRule
{
    constructor(public propertyName: string, public validate: ICompositeValidationRule["validate"], public getMessage: ICompositeValidationRule["getMessage"]){}
}