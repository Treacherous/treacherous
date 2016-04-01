export class PropertyStateChangedEvent
{
    constructor(public property: string, public isValid: boolean, public error?: string) {}
}