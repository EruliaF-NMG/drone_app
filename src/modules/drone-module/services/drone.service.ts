import { CoreService } from "../../../core";
import { DroneEntity, IDrone } from "../entities/drone.entity";
import { IDroneService } from "../interface/drone-service.interface";

export class DroneService extends CoreService<IDrone> implements IDroneService<IDrone> {

    constructor() {
        super(DroneEntity);
    }
}