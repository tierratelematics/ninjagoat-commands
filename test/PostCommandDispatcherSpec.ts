import "reflect-metadata";
import {HttpClient, IDateRetriever, IGUIDGenerator, IHttpClient} from "ninjagoat";
import MockDateRetriever from "./fixtures/MockDateRetriever";
import MockGuidGenerator from "./fixtures/MockGuidGenerator";
import {EndpointCommand} from "./fixtures/MockCommands";
import CommandEnvelope from "../scripts/CommandEnvelope";
import PostCommandDispatcher from "../scripts/dispatchers/PostCommandDispatcher";
import {of} from "rxjs";
import expect = require("expect.js");
import sinon = require("sinon");

describe("PostCommandDispatcher, given a command", () => {

    let subject: PostCommandDispatcher,
        httpClient: IHttpClient,
        postStub: sinon.SinonStub,
        dateRetriever: IDateRetriever,
        guidGenerator: IGUIDGenerator;

    beforeEach(() => {
        httpClient = new HttpClient();
        dateRetriever = new MockDateRetriever();
        guidGenerator = new MockGuidGenerator();
        subject = new PostCommandDispatcher(dateRetriever, guidGenerator, httpClient, {endpoint: ""});
        postStub = sinon.stub(httpClient, "post", () => of({response: null}));
    });

    afterEach(() => {
        postStub.restore();
    });

    context("when the transport to be used is an HTTP Post", () => {
        it("should send it using an http client", () => {
            subject.dispatch(new EndpointCommand(), {});
            let envelope = CommandEnvelope.of(new EndpointCommand(), {});
            let anyCommand: any = envelope.payload;
            anyCommand.$manifest = "EndpointCommand";
            envelope.headers["CreatedTimestamp"] = "2016-05-16T09:52:18Z";
            envelope.headers["CausationId"] = "42";
            expect(postStub.calledWith("/foo", envelope)).to.be(true);
        });

        context("and there is a base url specified", () => {
            it("should prepend the base url in the request", () => {
                subject = new PostCommandDispatcher(dateRetriever, guidGenerator, httpClient, {endpoint: 'http://baseurl.com'});
                subject.dispatch(new EndpointCommand(), {});
                expect(postStub.args[0][0]).to.be('http://baseurl.com/foo');
            });
        });
    });
});