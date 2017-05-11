import ICommandDispatcher from "./ICommandDispatcher";
import CommandResponse from "../CommandResponse";
import IMetadataEnricher from "../enrichers/IMetadataEnricher";
import IPayload from "../IPayload";
import * as _ from "lodash";
import { injectable, inject, multiInject } from "inversify";
import { Dictionary } from "ninjagoat";

@injectable()
class CommandDispatcherEnricher implements ICommandDispatcher {

    constructor(@inject("CommandDispatcher") private commandDispatcher: ICommandDispatcher,
        @multiInject("IMetadataEnricher") private enrichers?: IMetadataEnricher[]) {

    }

    dispatch(command: IPayload): Promise<CommandResponse> {
        let headers: Dictionary<any> = _.reduce(this.enrichers, (result, enricher) => {
            result = enricher.enrich(command, result);
            return result;
        }, {});
        return this.commandDispatcher.dispatch(command, headers);
    }
}

export default CommandDispatcherEnricher;
