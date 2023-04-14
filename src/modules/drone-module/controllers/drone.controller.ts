import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { DroneStates } from "../../../config/core.enum";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { generateErrorResponse, generateResponse, getDroneWeightLimit } from "../../../helpers/util-helpers";
import { DroneDTO } from "../dtos/drone.dto";

import { IDrone } from "../entities/drone.entity";
import { IDroneService } from "../interface/drone-service.interface";


@Injectable()
@Controller('/api/drones')
export default class DroneController {
    
    constructor(
        @Inject("IDroneService") private _droneService: IDroneService<IDrone>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const drones = await this._droneService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,drones));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get drone type list'));
        }
    }

    @Get("/with-free-space")
    async getDroneWithFreeSpace(request: Request, response: Response) {
        try{
            const drones = await this._droneService.find({
                state: {
                    $in: [ DroneStates.IDLE, DroneStates.LOADING ]
                }
            });
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,drones));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get drone list'));
        }
    }

    @Get("/battery-capacity/:droneID")
    async getDroneBatteryCapacity(request: Request, response: Response) {
        try{
            const drone = await this._droneService.findByID(request.params.droneID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,{
                    battery_capacity : drone.battery_capacity
                }));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get drone list'));
        }
    }

    @Get("/:droneID")
    async getByID(request: Request, response: Response) {
        try{
            const drone = await this._droneService.findByID(request.params.droneID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,drone));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get drone type'));
        }
    }

    @Post()
    @ValidateBodyRequest(DroneDTO)
    async create(request: Request, response: Response) {
        try{
            let drone = request.body as IDrone;
            drone.weight_limit = getDroneWeightLimit(drone.model);

            drone = await this._droneService.create(drone);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,drone,'Drone type created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to create drone type'));
        }
    }

    @Put("/:droneID")
    @ValidateBodyRequest(DroneDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.droneID);
            let drone = request.body as IDrone;
            drone.weight_limit = getDroneWeightLimit(drone.model);
            drone = await this._droneService.update({_id},drone);
            if(drone)  return response.status(successPostResponse.httpStatus)
                            .json(generateResponse(successPostResponse,drone,'Drone type update successfully'));
            else      return response.status(failedPostResponse.httpStatus)
                            .json(generateErrorResponse(failedPostResponse,{},'Failed to update drone type'));                   
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to update drone type'));
        }
    }

}