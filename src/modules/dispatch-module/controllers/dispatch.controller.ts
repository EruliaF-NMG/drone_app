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
@Controller('/api/dispatch')
export default class DispatchController {
    
    constructor(
        @Inject("IDispatchService") private _dispatchService: IDispatchService<IDispatch>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const dispatch = await this._dispatchService.getAllWithReference();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,dispatch));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get dispatch data'));
        }
    }

    @Post()
    @ValidateBodyRequest(DispatchDTO)
    async create(request: Request, response: Response) {
        try{
            const createStatus:DBReturnStatus<IDispatch> = await this._dispatchService.createMedicalDispatch(request.body.drone_reference,request.body.medication_reference);
            return response.status(createStatus.status ? successPostResponse.httpStatus : failedPostResponse.httpStatus)
                .json(generateResponse(createStatus.status ? successPostResponse : failedPostResponse,createStatus.returnObject,createStatus.message));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to create dispatch'));
        }
    }

}