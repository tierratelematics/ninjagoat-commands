import {Dictionary} from "ninjagoat";
import IPayload from "../IPayload";

interface IMetadataEnricher {
    enrich(command?:IPayload, headers?:Dictionary<any>):Dictionary<any>
}

export default IMetadataEnricher