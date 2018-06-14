export declare class PropertyStateChangedEvent {
    property: string;
    isValid: boolean;
    error?: string;
    constructor(property: string, isValid: boolean, error?: string);
}
