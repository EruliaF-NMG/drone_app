import { Module } from "../../core";
import DroneController from "./controllers/drone.controller";


@Module({
    controllers:[DroneController]
})
export default class DroneModule{}