import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";
import {TypeHelper} from "../helpers/type-helper";

export class StepValidationRule implements IValidationRule
{
    public ruleName = "step";

    public async validate(modelResolver: IModelResolver, propertyName: string, step: number): Promise<boolean>
    {
        const value = modelResolver.resolve(propertyName);
       
        if (TypeHelper.isEmptyValue(value))
        { return true; }

        const dif = (value * 100) % (step * 100);
        return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
    }
}