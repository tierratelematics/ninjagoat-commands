import "reflect-metadata";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import MockDateRetriever from "./fixtures/MockDateRetriever";
import MockGuidGenerator from "./fixtures/MockGuidGenerator";
import MockWSCommandDispatcher from "./fixtures/MockWSCommandDispatcher";
import MockAuthCommandDispatcher from "./fixtures/MockAuthCommandDispatcher";
import CommandDispatcher from "../scripts/dispatchers/CommandDispatcher";
import MockPostCommandDispatcher from "./fixtures/MockPostCommandDispatcher";
import * as MockCommands from "./fixtures/MockCommands";
import CommandEnvelope from "../scripts/CommandEnvelope";

describe("Command dispatcher, given a command", () => {

    let sandbox:sinon.SinonSandbox;
    let subject:CommandDispatcher;
    let commandDispatcherWS:CommandDispatcher;
    let commandDispatcherAuth:CommandDispatcher;
    let subjectSpy:sinon.SinonSpy;
    let commandDispatcherWSSpy:sinon.SinonSpy;
    let commandDispatcherAuthSpy:sinon.SinonSpy;

    beforeEach(() => {
        let dateRetriever = new MockDateRetriever(),
            guidGenerator = new MockGuidGenerator();
        sandbox = sinon.sandbox.create();
        subject = new MockPostCommandDispatcher(dateRetriever, guidGenerator);
        commandDispatcherWS = new MockWSCommandDispatcher(dateRetriever, guidGenerator);
        commandDispatcherAuth = new MockAuthCommandDispatcher(dateRetriever, guidGenerator);
        subjectSpy = sandbox.spy(subject, "executeCommand");
        commandDispatcherWSSpy = sandbox.spy(commandDispatcherWS, "executeCommand");
        commandDispatcherAuthSpy = sandbox.spy(commandDispatcherAuth, "executeCommand");
        subject.setNext(commandDispatcherWS);
        commandDispatcherWS.setNext(commandDispatcherAuth);
    });

    afterEach(() => {
        sandbox.restore();
    });

    context("when it's not decorated with path, transport or authentication", () => {
        it("should be sent with the first dispatcher available", () => {
            subject.dispatch(new MockCommands.DefaultCommand());
            expect(subjectSpy.called).to.be(true);
            expect(commandDispatcherWSSpy.called).to.be(false);
        });
    });

    context("when it's decorated using a different endpoint", () => {
        it("should route the command correctly", () => {
            subject.dispatch(new MockCommands.EndpointCommand());
            expect(subjectSpy.called).to.be(true);
            expect(commandDispatcherWSSpy.called).to.be(false);
            expect(commandDispatcherAuthSpy.called).to.be(false);
        });
    });

    context("when it's decorated using a different transport", () => {
        it("should use those transport", () => {
            subject.dispatch(new MockCommands.TransportCommand());
            expect(subjectSpy.called).to.be(false);
            expect(commandDispatcherWSSpy.called).to.be(true);
            expect(commandDispatcherAuthSpy.called).to.be(false);
        });
    });

    context("when it's decorated using a different authentication strategy", () => {
        it("should authenticate correctly", () => {
            subject.dispatch(new MockCommands.AuthenticationCommand());
            expect(subjectSpy.called).to.be(false);
            expect(commandDispatcherWSSpy.called).to.be(false);
            expect(commandDispatcherAuthSpy.called).to.be(true);
        });
    });

    context("before being executed", () => {
        it("should create an envelope with a timestamp, an unique id and the type of the command", () => {
            let envelope = CommandEnvelope.of(new MockCommands.DefaultCommand());
            let anyCommand: any = envelope.payload;
            anyCommand.$manifest = "DefaultCommand";
            envelope.headers["CreatedTimestamp"] = "2016-05-16T09:52:18Z";
            envelope.headers["CausationId"] = "42";
            subject.dispatch(new MockCommands.DefaultCommand());
            expect(subjectSpy.calledWith(envelope)).to.be(true);
        });
    });

    context("when there's not a type information on it", () => {
        it("should throw an error", () => {
            expect(() => subject.dispatch(new MockCommands.UnnamedCommand())).to.throwError();
        });
    });
});