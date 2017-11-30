export class PropertyChangedEvent {
    constructor(propertyPath, newValue, oldValue) {
        this.propertyPath = propertyPath;
        this.newValue = newValue;
        this.oldValue = oldValue;
    }
}
