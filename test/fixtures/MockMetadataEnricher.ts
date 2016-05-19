import * as _ from "lodash";
import IMetadataEnricher from "../../scripts/enrichers/IMetadataEnricher";
import {Dictionary} from "ninjagoat";

class MockMetadataEnricher implements IMetadataEnricher {

    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any> {
        return _.merge({}, metadata, {"guid": "fixed-id"});
    }

}

export default MockMetadataEnricher