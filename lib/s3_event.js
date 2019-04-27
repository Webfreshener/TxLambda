/* ############################################################################
The MIT License (MIT)

Copyright (c) 2019 Van Schroeder
Copyright (c) 2019 Webfreshener, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

############################################################################ */
const {TxPipe} = require("txpipe");
const {JSONSchemaDraft04, LambdaEventSchema} = require("./schemas");
/**
 * pre-fab Lambda response object
 * @type {*}
 */
const EmptyResponseObject = {
    body: "",
    isBase64Encoded: false,
};

/**
 * @returns {function}
 */
module.exports = (() => {
    // Lambda Event Callback
    const _txHandler = (...pipesOrSchemas) => {
        return async (event) => {
            // Lambda request handler
            const _tx = new TxPipe(
                [
                    {
                        exec: (d) => (d.Records === void (0)) ? false : d,
                    },
                    {
                        schema: {
                            meta: [JSONSchemaDraft04],
                            schemas: [LambdaEventSchema],
                        },
                        exec: (lambdaRequestData) => {
                            const body = lambdaRequestData.Records[0];
                            return {
                                Bucket: body.s3.bucket.name,
                                Key: body.s3["object"].key,
                            }
                        },
                    },
                    {
                        $id: "s3-output#",
                        type: "object",
                        required: ["Bucket", "Key"],
                        properties: {
                            Bucket: {
                                type: "string",
                            },
                            Key: {
                                type: "string",
                            },
                        },
                    },
                ].concat(pipesOrSchemas)
            );
            return await new Promise((resolve, reject) => {
                if (_tx.txErrors) {
                    throw JSON.stringify(tx.txErrors);
                }

                const _sub = _tx.subscribe({
                    next: (response) => {
                        _sub.unsubscribe();
                        resolve(response.toJSON());
                        return true;
                    },
                    error: (e) => {
                        _sub.unsubscribe();
                        reject(e);
                        throw e;
                    },
                });

                _tx.txWrite(event);
            });
        };
    };

    // returns `promise` which resolves with rxjs observer
    return _txHandler;
})();
