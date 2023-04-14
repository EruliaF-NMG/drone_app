import { Module } from "../../core";
import MedicationController from "./controllers/medication.controller";
import { MedicationService } from "./services/medication.service";



@Module({
    controllers:[MedicationController],
    services:[
        { provide: 'IMedicationService', useClass: MedicationService },
    ]
})
export default class MedicationModule{}