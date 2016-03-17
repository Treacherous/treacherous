declare module "watchjs"
{
    export function watch(model: any,
       onChange: (propertyName: string, action: any, difference: any, oldValue: any) => void,
       deepness?: number, notifyOnSchemaChanges?: boolean);

    export function unwatch(model: any);

    export function callWatchers(model: any);
}