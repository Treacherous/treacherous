export class PropertyStateChangedEvent {
    constructor(property, isValid, error) {
        this.property = property;
        this.isValid = isValid;
        this.error = error;
    }
}
