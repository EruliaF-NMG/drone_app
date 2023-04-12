import { Controller } from "./decorators/controller.decorator";
import { Inject, Injectable } from "./decorators/ioc.decorator";
import { Module } from "./decorators/module.decorator";
import { Get,Post, Put } from "./decorators/router.decorator";
import { Body } from './decorators/request.decorators';
import CoreService from "./service/core-service";

export {
    Controller,
    Injectable,
    Inject,
    Module,
    Get,
    Post,
    Put,
    Body,
    CoreService,
}