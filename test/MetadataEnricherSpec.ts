import "reflect-metadata";
import expect = require("expect.js");
import Rx = require("rx");
import sinon = require("sinon");
import IMetadataEnricher from "../scripts/enrichers/IMetadataEnricher";
import {DefaultCommand} from "./fixtures/MockCommands";
import MockMetadataEnricher from "./fixtures/MockMetadataEnricher";

describe("Metadata enricher, given a list of enrichers", () => {

    let subject:IMetadataEnricher;

    beforeEach(() => {
        subject = new MockMetadataEnricher();
    });

    context("and no metadata where already added", () => {
        it("should enrich the command with metadata", () => {
            expect(subject.enrich()).to.eql({"CausationId": "fixed-id"});
        });
    });

    context("and some metadata where already added", () => {
        it("should merge the existing metadata with the new ones", () => {
            expect(subject.enrich(new DefaultCommand(), {"user": "existing-metadata"})).to.eql({
                "CausationId": "fixed-id",
                "user": "existing-metadata"
            });
        });
    });
});