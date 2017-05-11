import IMetadataEnricher from "./IMetadataEnricher";
import {injectable} from "inversify";
import {Dictionary} from "ninjagoat";

@injectable()
class EmptyMetadataEnricher implements IMetadataEnricher {

    enrich(command?:object, headers?:Dictionary<any>):Dictionary<any> {
        return headers;
    }

}

export default EmptyMetadataEnricher