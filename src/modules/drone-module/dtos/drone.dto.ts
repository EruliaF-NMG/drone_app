import { DroneModels, DroneStates } from "../../../config/core.enum";
import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class DroneDTO {

    @DisplayName('Serial number')
    @Rules('required|max:100|unique:drones,serial_number,droneID')
    @InputField()
    public serial_number: string;

    @DisplayName('Model Name')
    @Rules(`required|valueIn:${DroneModels.Lightweight},${DroneModels.Middleweight},${DroneModels.Cruiserweight},${DroneModels.Heavyweight}`)
    @InputField()
    public model: string;

    @DisplayName('Battery capacity')
    @Rules('required|numeric|maxAmount:100')
    @InputField()
    public battery_capacity: Number;

    @DisplayName('Drone state')
    @Rules(`required|valueIn:${DroneStates.IDLE},${DroneStates.LOADED},${DroneStates.LOADING},${DroneStates.RETURNING},${DroneStates.DELIVERING},${DroneStates.DELIVERED}`)
    @InputField()
    public state: string;
}