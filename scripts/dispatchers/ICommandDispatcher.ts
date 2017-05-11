import CommandResponse from "../CommandResponse";
import { Dictionary } from "ninjagoat";
import IPayload from "../IPayload";

interface ICommandDispatcher {
    dispatch(command: IPayload, headers?: Dictionary<any>): Promise<CommandResponse>;
}

export default ICommandDispatcher;
