import CommandDispatcher from "./CommandDispatcher";
import CommandEnvelope from "../CommandEnvelope";
import CommandResponse from "../CommandResponse";
import {inject, injectable} from "inversify";
import {IDateRetriever, IGUIDGenerator, IHttpClient} from "ninjagoat";
import * as Transport from "../constants/Transport";
import ICommandsConfig from "../ICommandsConfig";

@injectable()
class PostCommandDispatcher extends CommandDispatcher {

    constructor(@inject("IDateRetriever") dateRetriever: IDateRetriever,
                @inject("IGUIDGenerator") guidGenerator: IGUIDGenerator,
                @inject("IHttpClient") private httpClient: IHttpClient,
                @inject("ICommandsConfig") private config: ICommandsConfig) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command: object): boolean {
        return this.transport === Transport.HTTP_Post && !this.authentication;
    }

    executeCommand(envelope: CommandEnvelope): Promise<CommandResponse> {
        return this.httpClient.post(this.config.endpoint + this.endpoint, envelope).toPromise(Promise);
    }
}

export default PostCommandDispatcher