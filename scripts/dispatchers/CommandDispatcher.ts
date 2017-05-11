import ICommandDispatcher from "./ICommandDispatcher";
import CommandResponse from "../CommandResponse";
import CommandEnvelope from "../CommandEnvelope";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {Dictionary} from "ninjagoat";
import {injectable} from "inversify";

@injectable()
abstract class CommandDispatcher implements ICommandDispatcher {

    private nextDispatcher:ICommandDispatcher;
    protected transport:string;
    protected endpoint:string;
    protected authentication:string;
    protected type:string;

    constructor(private dateRetriever:IDateRetriever, private guidGenerator:IGUIDGenerator) {

    }

    dispatch(command:object, headers?:Dictionary<any>):Promise<CommandResponse> {
        this.extractCommandMetadata(command);
        if (!this.type)
            throw new Error("Missing type info from command");
        if ((!this.transport && !this.endpoint && !this.authentication) || this.canExecuteCommand(command)) {
            let anyCommand: any = command;
            anyCommand.$manifest = this.type;
            let envelope = CommandEnvelope.of(anyCommand, headers);
            envelope.headers["CausationId"] = this.guidGenerator.generate();
            envelope.headers["CreatedTimestamp"] = this.dateRetriever.getDate();
            return this.executeCommand(envelope);
        } else if (this.nextDispatcher) {
            return this.nextDispatcher.dispatch(command, headers);
        }
    }

    private extractCommandMetadata(command:object):void {
        this.transport = Reflect.getMetadata("Transport", command.constructor);
        this.endpoint = Reflect.getMetadata("Endpoint", command.constructor);
        this.authentication = Reflect.getMetadata("Authentication", command.constructor);
        this.type = Reflect.getMetadata("Type", command.constructor);
    }

    abstract canExecuteCommand(command:object):boolean;

    abstract executeCommand(envelope:CommandEnvelope):Promise<CommandResponse>;

    setNext(dispatcher:ICommandDispatcher):void {
        this.nextDispatcher = dispatcher;
    }
}

export default CommandDispatcher