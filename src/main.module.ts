import { Module } from "./core";
import UserModule from "./modules/drone-module/drone.module";
import MedicationModule from "./modules/medication-module/medication.module";

@Module({
    modules:[UserModule,MedicationModule]
})
export default class MainModule{}