import { DroneModels, DroneStates } from "../../../config/core.enum";
import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class DispatchDTO {

    @DisplayName('Drone ID')
    @Rules('required')
    @InputField()
    public drone_reference: string;

    @DisplayName('Medication ID')
    @Rules(`required`)
    @InputField()
    public medication_reference: string;

}