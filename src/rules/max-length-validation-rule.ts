import * as Promise from "bluebird";
import {IValidationRule} from "./ivalidation-rule";

export class MaxLengthValidationRule implements IValidationRule
{
    public ruleName = "maxLength";

    public validate(value, maxLength: number): Promise<boolean>
    {
        if (value === undefined || value === null || value.length == 0)
        { return Promise.resolve(true); }

        if(value.length <= maxLength)
        { return Promise.resolve(true); }

        return Promise.resolve(false);
    }

    public getMessage(value, maxLength) {
        return `This field has a length of ${value.length} but should contain no more than ${maxLength}`;
    }
}