import {IValidationRule} from "./ivalidation-rule";
import {ModelHelper} from "../model-helper";

export class RequiredValidationRule implements IValidationRule
{
    public ruleName = "required";

    public validate(modelHelper:ModelHelper, propertyName:string, isRequired: boolean = true): Promise<boolean>
    {
        var value = modelHelper.resolve(propertyName);

        if (value === undefined || value === null) {
            return Promise.resolve(!isRequired);
        }

        var testValue = value;
        if (typeof (testValue) === 'string') {
            if (String.prototype.trim) {
                testValue = value.trim();
            }
            else {
                testValue = value.replace(/^\s+|\s+$/g, '');
            }
        }

        if (!isRequired) {// if they passed: { required: false }, then don't require this
            return Promise.resolve(true);
        }

        return Promise.resolve((testValue + '').length > 0);
    }

    public getMessage(modelHelper:ModelHelper, propertyName:string, isRequired) {
        var value = modelHelper.resolve(propertyName);
        return "This field is required";
    }
}