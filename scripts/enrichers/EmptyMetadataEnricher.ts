import IMetadataEnricher from "./IMetadataEnricher";
import IPayload from "../IPayload";
import {injectable} from "inversify";
import {Dictionary} from "ninjagoat";

@injectable()
class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich(command?:IPayload, headers?:Dictionary<any>):Dictionary<any> {
        return headers;
    }

}

export default EmptyMetadataEnricher