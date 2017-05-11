# Ninjagoat-commands

Ninjagoat bindings for sending commands to a CQRS backend.

## Installation

`
$ npm install ninjagoat-commands
`

Register the module with ninjagoat

```typescript
//bootstrapper.ts
import {CommandsModule} from "ninjagoat-commands";

application.register(new CommandsModule())
```

## Usage

```typescript
import {ICommandDispatcher, IPayload, CommandDecorators as decorators} from "ninjagoat-commands";
let commandDispatcher:ICommandDispatcher; //Inject it somewhere

//Define a command
@decorators.Endpoint("/commands")
@decorators.Type("CreateResource")
class Command implemets IPayload {
    $manifest: string;
    id: string;
    
    constructor(id:string) {
        this.id = id;
    }
}

await commandDispatcher.dispatch(new Command("test-id"));
console.log('Command sent!');
```

### Customize command dispatchers

You can write a custom command dispatcher (just extend the abstract CommandDispatcher) and set it as the next executor.

```typescript
let commandDispatcher = serviceLocator.get<ICommandDispatcher>("ICommandDispatcher");
commandDispatcher.setNext(myCommandDispatcher);
```

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
