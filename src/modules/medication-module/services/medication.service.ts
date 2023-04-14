import { CoreService } from "../../../core";
import { IMedication, MedicationEntity } from "../entities/medication.entity";
import { IMedicationService } from "../interface/medication-service.interface";

export class MedicationService extends CoreService<IMedication> implements IMedicationService<IMedication> {

    constructor() {
        super(MedicationEntity);
    }
}