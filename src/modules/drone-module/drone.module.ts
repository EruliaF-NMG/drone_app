import { Module } from "../../core";
import DroneController from "./controllers/drone.controller";
import { DroneService } from "./services/drone.service";


@Module({
    controllers:[DroneController],
    services:[
        { provide: 'IDroneService', useClass: DroneService },
    ]
})
export default class DroneModule{}