export interface IPropertyResolver {
    resolveProperty: (model: any, propertyChain: string) => any;
    decomposePropertyRoute: (propertyRoute: string) => string[];
}
