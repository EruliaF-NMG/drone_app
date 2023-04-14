import { Module } from "./core";
import DispatchModule from "./modules/dispatch-module/dispatch.module";
import DroneModule from "./modules/drone-module/drone.module";
import MedicationModule from "./modules/medication-module/medication.module";

@Module({
    modules:[DroneModule,MedicationModule,DispatchModule]
})
export default class MainModule{}