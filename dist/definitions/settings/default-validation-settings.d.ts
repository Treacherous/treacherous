import { IModelWatcher } from "../watcher/imodel-watcher";
import { IValidationSettings } from "./ivalidation-settings";
import { IPropertyResolver } from "../resolvers/iproperty-resolver";
import { IModelResolver } from "../resolvers/imodel-resolver";
export declare class DefaultValidationSettings implements IValidationSettings {
    private propertyResolver;
    createModelWatcher(args?: any): IModelWatcher;
    createModelResolver(args?: any): IModelResolver;
    createPropertyResolver(args?: any): IPropertyResolver;
    constructor(propertyResolver: IPropertyResolver);
}
