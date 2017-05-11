import * as Decorators from "../../scripts/CommandDecorators";
import * as Authentication from "../../scripts/constants/Authentication";
import * as Transport from "../../scripts/constants/Transport";
import IPayload from "../../scripts/IPayload";

class Command implements IPayload {
    $manifest: string;
}

@Decorators.Type("DefaultCommand")
class DefaultCommand extends Command {
    public foo: string = "bar";
}

@Decorators.Type("EndpointCommand")
@Decorators.Endpoint("/foo")
@Decorators.Transport(Transport.HTTP_Post)
class EndpointCommand extends Command {
    public foo: string = "bar";
}

@Decorators.Type("TransportCommand")
@Decorators.Transport(Transport.WebSocket)
class TransportCommand extends Command {
    public foo: string = "bar";
}

@Decorators.Type("AuthenticationCommand")
@Decorators.Authentication(Authentication.Basic)
class AuthenticationCommand extends Command {
    public foo: string = "bar";
}

class UnnamedCommand extends Command {
    public foo: string = "bar";
}

export { DefaultCommand }
export { EndpointCommand }
export { TransportCommand }
export { AuthenticationCommand }
export { UnnamedCommand }
