import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class StepValidationRule implements IValidationRule
{
    public ruleName = "step";

    public async validate(modelResolver: IModelResolver, propertyName: string, step: number): Promise<boolean>
    {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        let dif = (value * 100) % (step * 100);
        return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, step: number) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} and should be an increment of ${step}`;
    }
}