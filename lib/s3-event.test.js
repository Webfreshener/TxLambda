const S3Event = require("./s3-event");
const {TxPipe} = require("txpipe");
const event = require("../fixtures/s3-put-notification.mock");

describe("S3Event Tests", () => {
    const _res = {body: "A-OK"};
    it("should handle lambda events as passthrough", (done) => {
        const _event = S3Event();
        _event(event).then(
            (res) => {
                expect(res.body)
                    .toEqual(JSON.stringify({Bucket:"txlambda-test-staging",Key:"txlambda-test.data.json"}));
                done();
            },
            (e) => done(e),
        ).catch((e) => done(e));
    });

    it("should execute callbacks", (done) => {
        const _event = S3Event({
                exec: (d) => {
                    return {statusCode: 200};
                }
            },
            {
                exec: (d) => Object.assign(d, _res)
            });
        _event(event).then(
            (res) => {
                expect(res.body).toEqual('{"statusCode":200,"body":"A-OK"}');
                done();
            },
            (e) => done(e),
        ).catch((e) => done(e));
    });

    it("should accept pipes", (done) => {
        const _event = S3Event(
            new TxPipe({
                exec: (d) => {
                    return Object.assign(_res, {statusCode: 200});
                }
            }),
            {
                exec: (d) => Object.assign(d, {statusCode: d.statusCode+50})
            });
        _event(event).then(
            (res) => {
                expect(res.body).toEqual('{"body":"A-OK","statusCode":250}');
                done();
            },
            (e) => done(e),
        ).catch((e) => done(e));
    });
});
