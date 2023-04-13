import mongoose from "mongoose";
import { DroneModels, DroneStates, DroneWeightLimits } from "../../../config/core.enum";
import { Column } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";

export interface IDrone {
    _id: mongoose.Schema.Types.ObjectId;
    serial_number: string;
    model: string;
    weight_limit: Number;
    battery_capacity: Number;
    state: string;
}
  
export class Drone {
    @Column({
        unique: true,
    })
    serial_number: string;
  
    @Column({
        trim: true,
        default: DroneModels.Lightweight,
        enum: [DroneModels.Lightweight,DroneModels.Middleweight,DroneModels.Cruiserweight,DroneModels.Heavyweight],
    })
    model: string;
    
    @Column({
        trim: true,
        default: DroneWeightLimits.Lightweight,
    })
    weight_limit: Number;

    @Column({})
    battery_capacity: Number;
  
    @Column({
        default: DroneStates.IDLE,
        enum: [DroneStates.IDLE,DroneStates.LOADED,DroneStates.LOADING,DroneStates.RETURNING,DroneStates.DELIVERING,DroneStates.DELIVERED],
        trim: true,
    })
    state: string;

    @Column({
        default: Date.now,
    })
    created_at: Date;
    
    @Column({
        default: Date.now,
    })
    updated_at: Date;
}
  
export const DroneEntity = mongooseWrapper.createModelBySchemaClass<IDrone>(Drone);