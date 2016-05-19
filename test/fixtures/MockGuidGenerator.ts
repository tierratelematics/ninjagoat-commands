import {IGUIDGenerator} from "ninjagoat";

class MockGuidGenerator implements IGUIDGenerator {

    generate():string {
        return "42";
    }

}

export default MockGuidGenerator