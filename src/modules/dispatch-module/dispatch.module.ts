import { Module } from "../../core";
import CheckStatusController from "./controllers/check-status.controller";
import DispatchController from "./controllers/dispatch.controller";
import { DispatchService } from "./services/dispatch.service";



@Module({
    controllers:[DispatchController,CheckStatusController],
    services:[
        { provide: 'IDispatchService', useClass: DispatchService },
    ]
})
export default class DispatchModule{}