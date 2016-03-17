import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class StepValidationRule implements IValidationRule
{
    public ruleName = "step";

    public validate(value, step: number): Promise<boolean>
    {
        if (value === undefined || value === null)
        { return Promise.resolve(true); }

        var dif = (value * 100) % (step * 100);
        var matchesStep = Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
        return Promise.resolve(matchesStep);
    }

    public getMessage(value, step) {
        return `This field has a value of ${value} and should be an increment of ${step}`;
    }
}