import { MiddlewareProperties } from "../../config/core.enum";

export function FileUpload(fileName: string = "") {
    return (target: any, propertyKey: string): void => {
        const existingInjections = Reflect.getMetadata(MiddlewareProperties.FileUploadProperties, target.constructor) as Map<string,string>;
        Reflect.defineMetadata(MiddlewareProperties.FileUploadProperties, {
            ...existingInjections,
            [propertyKey]:fileName
        }, target.constructor);
    };
}