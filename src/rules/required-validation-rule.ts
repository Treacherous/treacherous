import {IValidationRule} from "./ivalidation-rule";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class RequiredValidationRule implements IValidationRule
{
    public ruleName = "required";

    public validate(modelResolver: IModelResolver, propertyName: string, isRequired: boolean = true): Promise<boolean>
    {
        var value = modelResolver.resolve(propertyName);

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

    public getMessage(modelResolver: IModelResolver, propertyName: string, isRequired) {
        return "This field is required";
    }
}