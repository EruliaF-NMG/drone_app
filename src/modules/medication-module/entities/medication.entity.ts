import mongoose from "mongoose";
import { DroneModels, DroneStates, DroneWeightLimits } from "../../../config/core.enum";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";

export interface IMedication {
    _id: mongoose.Types.ObjectId;
    name: string;
    weight: Number;
    code: string;
}
  
export class Medication {
    @Column({
        trim: true,
    })
    name: string;
    
    @Column({
        trim: true,
    })
    weight: Number;

    @Column({
        trim: true,
        unique: true,
    })
    code: string;

    @Column({
        default: Date.now,
    })
    created_at: Date;
    
    @Column({
        default: Date.now,
    })
    updated_at: Date;
}
  
export const MedicationEntity = mongooseWrapper.createModelBySchemaClass<IMedication>(Medication);