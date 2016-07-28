import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class StepValidationRule implements IValidationRule
{
    public ruleName = "step";

    public validate(modelResolver: IModelResolver, propertyName: string, step: number): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var dif = (value * 100) % (step * 100);
        var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        return Promise.resolve(matchesStep);
    }

    public getMessage(modelResolver: IModelResolver, propertyName: string, step) {
        var value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} and should be an increment of ${step}`;
    }
}