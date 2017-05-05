export class ValidationError {
    constructor(propertyName, message) {
        this.propertyName = propertyName;
        this.message = message;
    }
}
