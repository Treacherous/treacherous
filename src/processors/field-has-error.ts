export class FieldHasError extends Error
{
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}