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
const {JSONSchemaDraft04, ELBRequestSchema, ELBResponseSchema} = require("./schemas");
/**
 * pre-fab Lambda response object
 * @type {*}
 */
const EmptyResponseObject = {
    statusCode: 200,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body: "",
    isBase64Encoded: false,
};

/**
 * Lambda request handler
 */

const _intake = new TxPipe({
        meta: [JSONSchemaDraft04],
        schemas: [ELBRequestSchema],
    },
);

const _output = new TxPipe({
        meta: [JSONSchemaDraft04],
        schemas: [ELBResponseSchema],
    },
);

/**
 * @returns {function}
 */
module.exports = () => {
    const handler = () => {
        return async (event) => {
            return new Promise((resolve, reject) => {
                const _sub = _output.subscribe({
                    next: (response) => {
                        response = response.toJSON();
                        _sub.unsubscribe();
                        if (response.statusCode >= 400) {
                            reject(response);
                            throw response;
                        }

                        resolve(response);
                    },
                    error: (e) => {
                        _sub.unsubscribe();
                        const _e = {
                            statusCode: 400,
                            body: JSON.stringify(e, null, 2),
                        };

                        reject(_e);
                        throw _e;
                    },
                });
                _intake.txWrite(event);
            });
        };
    };

    // response setter
    Object.defineProperty(handler, "response", {
        set: (data) => _output.txWrite(Object.assign(EmptyResponseObject, data)),
        enumerable: true,
        configurable: false,
    });

    Object.defineProperty(handler, "subscribe", {
        value: (handler) => _intake.subscribe(handler),
        enumerable: true,
        configurable: false,
    });

    // returns `promise` which resolves with rxjs observer
    return handler;
};
