import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, Get, Inject, Injectable, Post, Put } from "../../../core";
import { generateErrorResponse, generateResponse } from "../../../helpers/util-helpers";


@Injectable()
@Controller('/api/drone')
export default class DroneController {
    
    constructor(
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,"yese96"));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed To Generate user List'));
        }
    }

}