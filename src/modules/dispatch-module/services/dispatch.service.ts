import { DroneStates } from "../../../config/core.enum";
import { CoreService, Inject, Injectable } from "../../../core";
import { DBReturnStatus } from "../../../core/types/type.interface";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { getValue } from "../../../helpers/util-helpers";
import { IDrone } from "../../drone-module/entities/drone.entity";
import { IDroneService } from "../../drone-module/interface/drone-service.interface";
import { IMedication } from "../../medication-module/entities/medication.entity";
import { IMedicationService } from "../../medication-module/interface/medication-service.interface";
import { DispatchEntity, IDispatch, IDispatchWithReference } from "../entities/dispatch.entity";
import { IDispatchService } from "../interface/dispatch-service.interface";

@Injectable()
export class DispatchService extends CoreService<IDispatch> implements IDispatchService<IDispatch> {

    constructor(
        @Inject("IDroneService") private _droneService: IDroneService<IDrone>,
        @Inject("IMedicationService") private _medicationService: IMedicationService<IMedication>,
    ) {
        super(DispatchEntity);
    }

    async getAllWithReference(): Promise<Array<IDispatchWithReference>> {
       return await DispatchEntity.find()
        .populate({
            path: 'drone_reference',
            model:'Drone',
            select:"_id serial_number model weight_limit battery_capacity state",
        }).populate({
            path: 'medication_reference',
            model:'Medication',
            select:"_id name model weight code",
        });
    }

    async getMedicationReferenceByDroneID(drone_reference:string): Promise<any> {
        return await DispatchEntity.find({ "drone_reference": drone_reference})
        .populate({
            path: 'medication_reference',
            model:'Medication',
            select:"_id name model weight code",
        });
    }

    async createMedicalDispatch(drone_reference:string,medication_reference:string): Promise<DBReturnStatus<IDispatch>> {
        let session = await mongooseWrapper.getConnection().startSession();
        try{
            session.startTransaction();
            const drone =  await this._droneService.findByID(drone_reference);
            const medication = await this._medicationService.findByID(medication_reference);
            const medicationReference = await this.getMedicationReferenceByDroneID(drone_reference);
            const currentWeight = medicationReference.reduce((accumulator:any, object:any) => getValue(object,'medication_reference.weight',0) + accumulator,0);
          
            if( drone.weight_limit > currentWeight + medication.weight ) {
                if(drone.battery_capacity > 25 ) {
                    // state will change to loading
                    drone.state=DroneStates.LOADING;
                    // assume the battery will lose 10% when loading items
                    drone.battery_capacity = (Number(drone.battery_capacity) - (Number(drone.battery_capacity) * 0.1));
                    this._droneService.update({_id:drone._id},drone);

                    const dispatch = await this.create({
                        drone_reference,
                        medication_reference,
                    });

                    await session.commitTransaction();
                    session.endSession();

                    return {
                        "status" :true,
                        "message" : "Dispatch created successfully!",
                        "returnObject": dispatch
                    }
                } else {
                    return {
                        "status" :false,
                        "message" : "Drone's battery capacity is too low",
                        "returnObject": null
                    }
                }
            } else {
                return {
                    "status" :false,
                    "message" : "Not enough space to dispatch",
                    "returnObject": null
                }
            }

        } catch(ex) {
            await session.abortTransaction();
            console.log(ex);
            return {
                "status" :false,
                "message" : "Something went wrong, please try again!",
                "returnObject": null
            }
        }
    }
}