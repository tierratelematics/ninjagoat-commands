import { Dictionary } from "ninjagoat";

class CommandEnvelope {
    headers: Dictionary<any>;
    payload: object;

    static of(payload: object, headers?: Dictionary<any>) {
        let envelope = new CommandEnvelope();
        envelope.payload = payload;
        envelope.headers = headers || {};
        return envelope;
    }
}

export default CommandEnvelope;
