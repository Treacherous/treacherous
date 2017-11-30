import {IModelResolver} from "../resolvers/imodel-resolver";

export const locale =
{
    "default": "This field is invalid",
    "required": "This field is required",
    "date": (value: any) => `This field contains "${value}" which is not a valid date`,
    "decimal": (value: any) => `This field contains ${value} which is not a decimal value`,
    "equal": (value: any, optionsOrValue: any) => `This field is ${value} but should be equal to ${optionsOrValue.value || optionsOrValue}`,
    "notEqual": (value: any, optionsOrValue: any) => `This field is ${value} but should not be equal to ${optionsOrValue.value || optionsOrValue}`,
    "isoDate": (value: any) => `This field contains "${value}" which is not a valid ISO date`,
    "maxLength": (value: any, maxLength: number) => `This field has a length of ${value.length} but should contain no more than ${maxLength}`,
    "minLength": (value: any, minLength: number) => `This field has a length of ${value.length} but should more than ${minLength}`,
    "maxValue": (value: any, maxValue: number) => `This field has a value of ${value} but should be less than or equal to ${maxValue}`,
    "minValue": (value: any, minValue: number) => `This field has a value of ${value} but should be greater than or equal to ${minValue}`,
    "number": (value: any) => `This field contains ${value} which is not a numeric value`,
    "regex": "This field does not match the expected format",
    "step": (value: any, step: number) => `This field has a value of ${value} and should be an increment of ${step}`,
    "matches": (modelResolver: IModelResolver, propertyName: string, optionsOrProperty: any) => {
        const value = modelResolver.resolve(propertyName);
        const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        const matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    },
};