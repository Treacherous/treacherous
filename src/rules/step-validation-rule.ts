import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class StepValidationRule implements IValidationRule
{
    public ruleName = "step";

    public validate(modelHelper:ModelHelper, propertyName:string, step: number): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var dif = (value * 100) % (step * 100);
        var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        return Promise.resolve(matchesStep);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, step) {
        var value = modelHelper.resolve(propertyName);
        return `This field has a value of ${value} and should be an increment of ${step}`;
    }
}