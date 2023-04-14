import { DroneModels, DroneStates } from "../../../config/core.enum";
import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class MedicationDTO {

    @DisplayName('Name')
    @Rules('required|regex:^[0-9a-zA-Z-_]+$')
    @InputField()
    public name: string;

    @DisplayName('Weight')
    @Rules(`required|numeric`)
    @InputField()
    public weight: string;

    @DisplayName('Code')
    @Rules('required|regex:^[0-9A-Z_]+$|unique:medication,code,medicationID')
    @InputField()
    public code: string;
}