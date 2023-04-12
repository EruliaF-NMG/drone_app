import { Module } from "./core";
import UserModule from "./modules/drone-module/drone.module";

@Module({
    modules:[UserModule]
})
export default class MainModule{}