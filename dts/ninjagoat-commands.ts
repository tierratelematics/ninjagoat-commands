/// <reference path="../typings/index.d.ts" />

import {IModule} from "ninjagoat";
import {IKernelModule} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import {Dictionary} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IDateRetriever} from "ninjagoat";

declare module NinjagoatCommands {

    class CommandsModule implements IModule {

        modules:IKernelModule;

        register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void;
    }

    interface CommandDecoratorsStatic {
        Authentication(type:string)
        Endpoint(endpoint:string)
        Transport(type:string)
        Type(type:string)
    }

    export var CommandDecorators:CommandDecoratorsStatic;

    interface AuthenticationStatic {
        Bearer:string;
        Basic:string;
    }

    export var Authentication:AuthenticationStatic;

    interface TransportStatic {
        HTTP_Post:string,
        WebSocket:string
    }

    export var Transport:TransportStatic;

    export interface ICommandDispatcher {
        dispatch(command:Object, metadata?:Dictionary<any>):Rx.IPromise<CommandResponse>;
    }

    export interface CommandResponse {
        response:any;
    }

    export abstract class CommandDispatcher implements ICommandDispatcher {

        constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator);

        dispatch(command:Object, metadata?:Dictionary<any>):Rx.IPromise<CommandResponse>;

        abstract canExecuteCommand(command:Object);

        abstract executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse>;

        setNext(dispatcher:ICommandDispatcher):void;
    }

    class CommandEnvelope {
        id:string;
        type:string;
        createdTimestamp:string;
        metadata:Dictionary<any>;
        payload:Object;

        static of(payload:Object, metadata?:Dictionary<any>);
    }

    export interface IMetadataEnricher {
        enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any>
    }
}

export = NinjagoatCommands;