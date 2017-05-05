export class ISODateValidationRule {
    constructor() {
        this.ruleName = "isoDate";
        this.isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
    }
    async validate(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return true;
        }
        return this.isoDateRegex.test(value);
    }
    getMessage(modelResolver, propertyName) {
        let value = modelResolver.resolve(propertyName);
        return `This field contains "${value}" which is not a valid ISO date`;
    }
}
