export const locale = {
    "default": "This field is invalid",
    "required": "This field is required",
    "date": (value) => `This field contains "${value}" which is not a valid date`,
    "decimal": (value) => `This field contains ${value} which is not a decimal value`,
    "equal": (value, optionsOrValue) => `This field is ${value} but should be equal to ${optionsOrValue.value || optionsOrValue}`,
    "notEqual": (value, optionsOrValue) => `This field is ${value} but should not be equal to ${optionsOrValue.value || optionsOrValue}`,
    "isoDate": (value) => `This field contains "${value}" which is not a valid ISO date`,
    "maxLength": (value, maxLength) => `This field has a length of ${value.length} but should contain no more than ${maxLength}`,
    "minLength": (value, minLength) => `This field has a length of ${value.length} but should more than ${minLength}`,
    "maxValue": (value, maxValue) => `This field has a value of ${value} but should be less than or equal to ${maxValue}`,
    "minValue": (value, minValue) => `This field has a value of ${value} but should be greater than or equal to ${minValue}`,
    "number": (value) => `This field contains ${value} which is not a numeric value`,
    "regex": "This field does not match the expected format",
    "step": (value, step) => `This field has a value of ${value} and should be an increment of ${step}`,
    "matches": (modelResolver, propertyName, optionsOrProperty) => {
        const value = modelResolver.resolve(propertyName);
        const fieldToMatch = optionsOrProperty.property || optionsOrProperty;
        const matchingFieldValue = modelResolver.resolve(fieldToMatch);
        return `This field is ${value} but should match ${matchingFieldValue}`;
    },
};
