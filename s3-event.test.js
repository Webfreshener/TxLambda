const {S3Event} = require("./index");
const event = require("./fixtures/s3-put-notification.mock");

describe("S3Event Tests", () => {
    const _res = {body: "A-OK"};
    it("should handle lambda events as passthrough", (done) => {
        const _event = S3Event();
        _event(event).then(
            (res) => {
                expect(JSON.stringify(res)).toEqual(JSON.stringify(event));
                done();
            },
            (e) => done(e),
        ).catch((e) => done(e));
    });

    it("should execute callbacks", (done) => {
        const _event = S3Event({
            callback: (d) => {
                return {statusCode: 200};
            }
        }, {callback: (d) => Object.assign(d, _res)});
        _event(event).then(
            (res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(_res.body);
                done();
            },
            (e) => done(e),
        ).catch((e) => done(e));
    })
});
