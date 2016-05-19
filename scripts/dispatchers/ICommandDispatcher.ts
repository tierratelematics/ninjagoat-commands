import CommandResponse from "../CommandResponse";
import {Dictionary} from "ninjagoat";

interface ICommandDispatcher {
    dispatch(command:Object, metadata?:Dictionary<any>):Rx.IPromise<CommandResponse>;
}

export default ICommandDispatcher