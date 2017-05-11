import * as _ from "lodash";
import IMetadataEnricher from "../../scripts/enrichers/IMetadataEnricher";
import {Dictionary} from "ninjagoat";

class MockDateEnricher implements IMetadataEnricher {

    enrich(command?:Object, metadata?:Dictionary<any>):Dictionary<any> {
        return _.merge({}, metadata, {"CreatedTimestamp": "2016-05-16T09:52:18Z"});
    }
}

export default MockDateEnricher