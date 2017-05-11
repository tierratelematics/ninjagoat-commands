import { Dictionary } from "ninjagoat";
import IPayload from "./IPayload";

class CommandEnvelope {
    headers: Dictionary<any>;
    payload: IPayload;

    static of(payload: IPayload, headers?: Dictionary<any>) {
        let envelope = new CommandEnvelope();
        envelope.payload = payload;
        envelope.headers = headers || {};
        return envelope;
    }
}

export default CommandEnvelope;
