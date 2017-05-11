import {Dictionary} from "ninjagoat";

interface IMetadataEnricher {
    enrich(command?:object, headers?:Dictionary<any>):Dictionary<any>
}

export default IMetadataEnricher