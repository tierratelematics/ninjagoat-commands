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

interface TransportStatic {
    HTTP_Post: string,
    WebSocket: string
}

export var Transport: TransportStatic;

export interface ICommandDispatcher {
    dispatch(command: object, headers?: Dictionary<any>): Promise<CommandResponse>;
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

    dispatch(command: object, headers?: Dictionary<any>): Promise<CommandResponse>;

    abstract canExecuteCommand(command: object): boolean;

    abstract executeCommand(envelope: CommandEnvelope): Promise<CommandResponse>;

    setNext(dispatcher: ICommandDispatcher): void;
}

export class CommandDispatcherEnricher implements ICommandDispatcher {
    dispatch(command: object, headers?: Dictionary<any>): Promise<CommandResponse>;
}

export class PostCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever: IDateRetriever, guidGenerator: IGUIDGenerator, httpClient: IHttpClient, config: ICommandsConfig);

    canExecuteCommand(command: object): boolean;

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse>;

}

declare class CommandEnvelope {
    headers: Dictionary<any>;
    payload: object;

    static of(payload: object, headers?: Dictionary<any>);
}

export interface IMetadataEnricher {
    enrich(command?: object, headers?: Dictionary<any>): Dictionary<any>
}

export interface ICommandsConfig {
    endpoint: string;
}