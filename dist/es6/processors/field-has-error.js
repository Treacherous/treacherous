export class FieldHasError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
