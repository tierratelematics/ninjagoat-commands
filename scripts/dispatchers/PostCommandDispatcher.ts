import CommandDispatcher from "./CommandDispatcher";
import CommandEnvelope from "../CommandEnvelope";
import CommandResponse from "../CommandResponse";
import {injectable, inject, named} from "inversify";
import {RegistrationKeys} from "ninjagoat";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {IEndpointConfig} from "ninjagoat";
import * as Transport from "../constants/Transport";

@injectable()
class PostCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever:IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator:IGUIDGenerator,
                @inject("IHttpClient") private httpClient:IHttpClient,
                @inject("IEndpointConfig") @named(RegistrationKeys.Config_Base) private config:IEndpointConfig) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return this.httpClient.post(this.config.endpoint + this.endpoint, envelope).toPromise();
    }

}

export default PostCommandDispatcher