import { ICoreService } from "../../../core/interfaces/core-service.interface";
import { DBReturnStatus } from "../../../core/types/type.interface";
import { IDispatchWithReference } from "../entities/dispatch.entity";

export interface IDispatchService<T> extends ICoreService<T> {
    getAllWithReference(): Promise<Array<IDispatchWithReference>>;
    getMedicationReferenceByDroneID(drone_reference:string): Promise<any>;
    createMedicalDispatch(drone_reference:string,medication_reference:string):Promise<DBReturnStatus<T>>;
}