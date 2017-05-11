import CommandResponse from "../CommandResponse";
import { Dictionary } from "ninjagoat";

interface ICommandDispatcher {
    dispatch(command: object, headers?: Dictionary<any>): Promise<CommandResponse>;
}

export default ICommandDispatcher;
