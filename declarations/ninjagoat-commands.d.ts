import {IModule, IHttpClient} from "ninjagoat";
import {interfaces} from "inversify";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import {Dictionary} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IDateRetriever} from "ninjagoat";

export class CommandsModule implements IModule {

    modules: (container: interfaces.Container) => void;

    register(registry: IViewModelRegistry, serviceLocator?: IServiceLocator, overrides?: any): void;
}

interface CommandDecoratorsStatic {
    Authentication(type: string)
    Endpoint(endpoint: string)
    Transport(type: string)
    Type(type: string)
}

export var CommandDecorators: CommandDecoratorsStatic;

interface AuthenticationStatic {
    Bearer: string;
    Basic: string;
}

export var Authentication: AuthenticationStatic;

export interface IPayload {
    $manifest: string;
}

interface TransportStatic {
    HTTP_Post: string,
    WebSocket: string
}

export var Transport: TransportStatic;

export interface ICommandDispatcher {
    dispatch(command: IPayload, headers?: Dictionary<any>): Promise<CommandResponse>;
}

export interface CommandResponse {
    response: any;
}

export abstract class CommandDispatcher implements ICommandDispatcher {
    protected transport: string;
    protected endpoint: string;
    protected authentication: string;
    protected type: string;

    constructor(dateRetriever: IDateRetriever, guidGenerator: IGUIDGenerator);

    dispatch(command: IPayload, headers?: Dictionary<any>): Promise<CommandResponse>;

    abstract canExecuteCommand(command: IPayload): boolean;

    abstract executeCommand(envelope: CommandEnvelope): Promise<CommandResponse>;

    setNext(dispatcher: ICommandDispatcher): void;
}

export class CommandDispatcherEnricher implements ICommandDispatcher {
    dispatch(command: IPayload, headers?: Dictionary<any>): Promise<CommandResponse>;
}

export class PostCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever: IDateRetriever, guidGenerator: IGUIDGenerator, httpClient: IHttpClient, config: ICommandsConfig);

    canExecuteCommand(command: IPayload): boolean;

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse>;

}

declare class CommandEnvelope {
    headers: Dictionary<any>;
    payload: IPayload;

    static of(payload: IPayload, headers?: Dictionary<any>);
}

export interface IMetadataEnricher {
    enrich(command?: IPayload, headers?: Dictionary<any>): Dictionary<any>
}

export interface ICommandsConfig {
    endpoint: string;
}