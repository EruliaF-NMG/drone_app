import { Request, Response } from "express";
import { exceptionOccurredResponse, failedPostResponse, successGetResponse, successPostResponse } from "../../../config/api-response.config";
import { Controller, FileUpload, Get, Inject, Injectable, Post, Put, ValidateBodyRequest } from "../../../core";
import mongooseWrapper from "../../../core/wrappers/mongoose.wrapper";
import { generateErrorResponse, generateResponse, getDroneWeightLimit } from "../../../helpers/util-helpers";
import { MedicationDTO } from "../dtos/medication.dto";
import { IMedication } from "../entities/medication.entity";
import { IMedicationService } from "../interface/medication-service.interface";
import gridFSWrapper from "../../../core/wrappers/grid-fs.wrapper";





@Injectable()
@Controller('/api/medications')
export default class MedicationController {
    
    constructor(
        @Inject("IMedicationService") private _medicationService: IMedicationService<IMedication>,
    ) {}

    @Get()
    async getAll(request: Request, response: Response) {
        try{
            const medications = await this._medicationService.find();
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,medications));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed get medication list'));
        }
    }

    @Get("/:medicationsID")
    async getByID(request: Request, response: Response) {
        try{
            const medication = await this._medicationService.findByID(request.params.medicationsID);
            return response.status(successGetResponse.httpStatus)
                .json(generateResponse(successGetResponse,medication));
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get medication'));
        }
    }

    @Get("/get-image-by-id/:medicationsID")
    async getImageByID(request: Request, response: Response) {
        try{
            const id = mongooseWrapper.getObjectID(request.params.medicationsID);
            const file = await gridFSWrapper.getFile(mongooseWrapper.getObjectID(request.params.medicationsID));
            if(file) {
                response.header('Content-Length', file.length);
                response.header('Content-Type', file.contentType);
                gridFSWrapper.sendFileToResponse(id,response);
            }
        } catch(ex){
            return response.status(exceptionOccurredResponse.httpStatus)
                .json(generateErrorResponse(exceptionOccurredResponse,ex,'Failed to get medication'));
        }
    }

    @Post()
    @FileUpload('medication_image')
    @ValidateBodyRequest(MedicationDTO)
    async create(request: Request, response: Response) {
        try{
            const medication = await this._medicationService.create(request.body);
            await gridFSWrapper.uploadImage(medication._id, request.file);
            return response.status(successPostResponse.httpStatus)
                .json(generateResponse(successPostResponse,medication,'Medication created successfully'));
        } catch(ex){
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to create medication'));
        }
    }

    @Put("/:medicationsID")
    @ValidateBodyRequest(MedicationDTO)
    async update(request: Request, response: Response) {
        try{
            const _id = mongooseWrapper.getObjectID(request.params.medicationsID);
            const medication = await this._medicationService.update({_id},request.body);
            if(medication)  return response.status(successPostResponse.httpStatus)
                            .json(generateResponse(successPostResponse,medication,'Medication update successfully'));
            else      return response.status(failedPostResponse.httpStatus)
                            .json(generateErrorResponse(failedPostResponse,{},'Failed to update medication'));                   
        } catch(ex){ 
            return response.status(failedPostResponse.httpStatus)
                .json(generateErrorResponse(failedPostResponse,ex,'Failed to update medication'));
        }
    }

}