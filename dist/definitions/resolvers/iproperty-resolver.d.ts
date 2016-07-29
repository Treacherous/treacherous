export interface IPropertyResolver {
    resolveProperty(model: any, propertyChain: string): any;
    decomposePropertyRoute(propertyRoute: string): Array<string>;
    getPropertyRouteSection(propertyRoute: string, sectionIndex: any): any;
    buildPropertyRoute(propertySections: Array<string>): string;
}
