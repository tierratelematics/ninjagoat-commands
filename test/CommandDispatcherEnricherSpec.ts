import "reflect-metadata";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import ICommandDispatcher from "../scripts/dispatchers/ICommandDispatcher";
import MockMetadataEnricher from "./fixtures/MockMetadataEnricher";
import MockDateEnricher from "./fixtures/MockDateEnricher";
import CommandDispatcherEnricher from "../scripts/dispatchers/CommandDispatcherEnricher";
import * as MockCommands from "./fixtures/MockCommands";
import MockDateRetriever from "./fixtures/MockDateRetriever";
import MockGuidGenerator from "./fixtures/MockGuidGenerator";
import MockAuthCommandDispatcher from "./fixtures/MockAuthCommandDispatcher";

describe("Command dispatcher enricher, given a list of enrichers", () => {

    let subject:ICommandDispatcher;
    let commandDispatcher:ICommandDispatcher;
    let dispatchSpy:sinon.SinonSpy;

    beforeEach(() => {
        commandDispatcher = new MockAuthCommandDispatcher(new MockDateRetriever(), new MockGuidGenerator());
        subject = new CommandDispatcherEnricher(commandDispatcher, [new MockMetadataEnricher(), new MockDateEnricher()]);
        dispatchSpy = sinon.spy(commandDispatcher, "dispatch");
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    context("when a commands needs to be sent", () => {
        it("should append all the metadata provided by the enriches to that command", () => {
            let command = new MockCommands.DefaultCommand();
            subject.dispatch(command);
            command.$manifest = "DefaultCommand"; // needed because the dispatcher sets the manifest
            expect(dispatchSpy.calledWith(command, {"CausationId": "42",
             "CreatedTimestamp": "2016-05-16T09:52:18Z"})).to.be(true);
        });
    });
});