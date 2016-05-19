import * as Transport from "../../scripts/constants/Transport";
import CommandDispatcher from "../../scripts/dispatchers/CommandDispatcher";
import {IDateRetriever} from "ninjagoat";
import CommandResponse from "../../scripts/CommandResponse";
import CommandEnvelope from "../../scripts/CommandEnvelope";
import {IGUIDGenerator} from "ninjagoat";

class MockWSCommandDispatcher extends CommandDispatcher {

    constructor(dateRetriever:IDateRetriever, guidGenerator:IGUIDGenerator) {
        super(dateRetriever, guidGenerator);
    }

    canExecuteCommand(command:Object):boolean {
        return this.transport === Transport.WebSocket;
    }

    executeCommand(command:CommandEnvelope):Rx.IPromise<CommandResponse> {
        return null;
    }

}

export default MockWSCommandDispatcher