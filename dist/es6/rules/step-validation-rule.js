export class StepValidationRule {
    constructor() {
        this.ruleName = "step";
    }
    async validate(modelResolver, propertyName, step) {
        let value = modelResolver.resolve(propertyName);
        if (value === undefined || value === null) {
            return Promise.resolve(true);
        }
        let dif = (value * 100) % (step * 100);
        return Math.abs(dif) < 0.00001 || Math.abs(1 - dif) < 0.00001;
    }
    getMessage(modelResolver, propertyName, step) {
        let value = modelResolver.resolve(propertyName);
        return `This field has a value of ${value} and should be an increment of ${step}`;
    }
}
