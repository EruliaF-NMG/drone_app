import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import { DBReturnStatus } from "../../../core/types/type.interface";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { generateErrorResponse, generateResponse, getDroneWeightLimit } from "../../../helpers/util-helpers";
import { DispatchDTO } from "../dtos/dispatch.dto";

import { IDispatch } from "../entities/dispatch.entity";
import { IDispatchService } from "../interface/dispatch-service.interface";


@Injectable()
@Controller('/api/check')
export default class CheckStatusController {
    
    constructor(
        @Inject("IDispatchService") private _dispatchService: IDispatchService<IDispatch>,
    ) {}

    @Get('/medication-items-by-drone/:droneID')
    async getMedicationItemsByDrone(request: Request, response: Response) {
        try{
            const dispatch = await this._dispatchService.getMedicationReferenceByDroneID(request.params.droneID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,dispatch));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get medication items'));
        }
    }

    @Get('/free-drones')
    async getDrones(request: Request, response: Response) {
        try{
            const dispatch = await this._dispatchService.getMedicationReferenceByDroneID(request.params.droneID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,dispatch));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get free drones'));
        }
    }

}