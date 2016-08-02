import CommandResponse from "../CommandResponse";
import {Dictionary} from "ninjagoat";
import * as Promise from "bluebird";

interface ICommandDispatcher {
    dispatch(command:Object, metadata?:Dictionary<any>):Promise<CommandResponse>;
}

export default ICommandDispatcher