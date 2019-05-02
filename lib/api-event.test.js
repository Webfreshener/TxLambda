const {TxValidator} = require("txpipe");
const apiEvent = require("./api-event")();
const apiGet = require("../fixtures/api-get-request.mock");
const {JSONSchemaDraft04, ELBResponseSchema} = require("./schemas");
describe("API Event Tests", () => {
    it("should validate", () => {
        const _v = new TxValidator({
            meta: [JSONSchemaDraft04],
            schemas: [ELBResponseSchema],
        });

        let _vRes = _v.validate({});
        expect(_v.errors !== null).toBe(true);
        expect(_vRes).toBe(false);

        _vRes = _v.validate({
            statusCode: 200,
            body: "ok",
            isBase64Encoded: false,
            headers: {
                "Content-Type": "application/json",
            },
        });

        expect(_v.errors).toEqual(null);
        expect(_vRes).toBe(true);
    });

    it("should fulfill it's schemas", (done) => {
        apiEvent(apiGet).then(
            (res) => {
                expect(
                    (new TxValidator({
                        meta: [JSONSchemaDraft04],
                        schemas: [ELBResponseSchema],
                    })).validate(res)
                ).toBe(true);
                done();
            },
            (e) => done(e)
        ).catch((e) => {
            throw e
        });
    });
});
