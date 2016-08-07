export interface IValidationGroup {
    validate(): Promise<boolean>;
    validateProperty(propertyname: any): Promise<boolean>;
    getModelErrors(revalidate?: boolean): Promise<any>;
    getPropertyError(propertyRoute: string, revalidate?: boolean): Promise<any>;
    changeValidationTarget(model: any): any;
    release(): void;
}
