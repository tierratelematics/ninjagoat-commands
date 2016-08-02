import * as Transport from "../../scripts/constants/Transport";
import CommandDispatcher from "../../scripts/dispatchers/CommandDispatcher";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import CommandEnvelope from "../../scripts/CommandEnvelope";
import CommandResponse from "../../scripts/CommandResponse";
import * as Promise from "bluebird";

class MockPostCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.HTTP_Post;
    }

    executeCommand(envelope:CommandEnvelope):Promise<CommandResponse> {
        return null;
    }

}

export default MockPostCommandDispatcher