import mongoose from "mongoose";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { IDrone } from "../../drone-module/entities/drone.entity";
import { IMedication } from "../../medication-module/entities/medication.entity";

export interface IDispatch {
    _id: mongoose.Schema.Types.ObjectId;
    drone_reference: mongoose.Schema.Types.ObjectId;
    medication_reference:mongoose.Schema.Types.ObjectId;
    status: boolean;
}

export interface IDispatchWithReference {
    _id: mongoose.Schema.Types.ObjectId;
    drone_reference: IDrone;
    medication_reference:IMedication;
    status: boolean;
}
  
export class Dispatch {

    @Column({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drone'
    })
    drone_reference: mongoose.Schema.Types.ObjectId;
  
    @Column({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication'
    })
    medication_reference: mongoose.Schema.Types.ObjectId;

    @Column({
        default: true,
    })
    status: boolean;

    @Column({
        default: Date.now,
    })
    created_at: Date;

    @Column({
        default: Date.now,
    })
    updated_at: Date;
}
  
export const DispatchEntity = mongooseWrapper.createModelBySchemaClass<IDispatch>(Dispatch);