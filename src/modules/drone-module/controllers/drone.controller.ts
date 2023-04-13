import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
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
            const drons = await this._droneService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,drons));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get drone type list'));
        }
    }

    @Get("/:droneID")
    async getByID(request: Request, response: Response) {
        try{
            const dron = await this._droneService.findByID(request.params.droneID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,dron));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get drone type'));
        }
    }

    @Post()
    @ValidateBodyRequest(DroneDTO)
    async create(request: Request, response: Response) {
        try{
            let dron = request.body as IDrone;
            dron.weight_limit = getDroneWeightLimit(dron.model);

            dron = await this._droneService.create(dron);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,dron,'Drone type created successfully'));
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
            let dron = request.body as IDrone;
            dron.weight_limit = getDroneWeightLimit(dron.model);
            dron = await this._droneService.update({_id},dron);
            if(dron)  return response.status(successPostResponse.httpStatus)
                            .json(generateResponse(successPostResponse,dron,'Drone type update successfully'));
            else      return response.status(failedPostResponse.httpStatus)
                            .json(generateErrorResponse(failedPostResponse,{},'Failed to update drone type'));                   
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to update drone type'));
        }
    }

}