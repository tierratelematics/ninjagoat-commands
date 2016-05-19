import {IDateRetriever} from "ninjagoat";

class MockDateRetriever implements IDateRetriever {

    getDate():string {
        return "2016-05-16T09:52:18Z";
    }

}

export default MockDateRetriever