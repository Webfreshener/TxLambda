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
 *
 * @type {Function}
 */
module.exports = (() => {
    // Lambda Event Callback
    const _txHandler = (...pipesOrSchemas) => {
        return async (event) => {
            return await new Promise((resolve, reject) => {
                // Lambda request handler
                const _tx = new TxPipe(
                    [
                        ELBRequestSchema,
                        {
                            exec: (res) => {
                                if (res.statusCode < 400) {
                                    return resolve(res);
                                }
                                reject(res);
                            }
                        }
                    ].concat(
                        ...pipesOrSchemas,
                        {
                            exec: (d) => Object.assign({}, EmptyResponseObject, d),
                        },
                        ELBResponseSchema,
                    )
                );

                if (_tx.txErrors) {
                    throw JSON.stringify(_tx.txErrors);
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
        }
    };

    // returns `promise` which resolves with rxjs observer
    return _txHandler;
})();
