import { describe, Suite, it } from "mocha";
import * as assert from "assert";

describe("Test no Test", () => {
    it("test", () => {
        assert.equal(1, 1);
    });

    it("test2", () => {
        assert.equal(1, 2);
    });
});
