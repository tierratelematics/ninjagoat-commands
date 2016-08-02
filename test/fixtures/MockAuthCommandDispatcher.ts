import CommandEnvelope from "../../scripts/CommandEnvelope";
import * as Authentication from "../../scripts/constants/Authentication";
import CommandDispatcher from "../../scripts/dispatchers/CommandDispatcher";
import {IDateRetriever} from "ninjagoat";
import {IGUIDGenerator} from "ninjagoat";
import CommandResponse from "../../scripts/CommandResponse";
import * as Promise from "bluebird";

class MockAuthCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.authentication === Authentication.Basic;
    }

    executeCommand(envelope:CommandEnvelope):Promise<CommandResponse> {
        return null;
    }

}

export default MockAuthCommandDispatcher