import CommandDispatcher from "./CommandDispatcher";
import CommandEnvelope from "../CommandEnvelope";
import CommandResponse from "../CommandResponse";
import {injectable, inject} from "inversify";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import {IHttpClient} from "ninjagoat";
import {IBaseConfig} from "ninjagoat";
import * as Transport from "../constants/Transport";
import * as Promise from "bluebird";

@injectable()
class PostCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever:IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator:IGUIDGenerator,
                @inject("IHttpClient") private httpClient:IHttpClient,
                @inject("IBaseConfig") private config:IBaseConfig) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope:CommandEnvelope):Promise<CommandResponse> {
        return <Promise<CommandResponse>>this.httpClient.post(this.config.endpoint + this.endpoint, envelope).toPromise();
    }

}

export default PostCommandDispatcher