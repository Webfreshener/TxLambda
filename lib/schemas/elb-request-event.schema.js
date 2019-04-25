module.exports = {
    // $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
        requestContext: {
            type: "object",
            properties: {

            },
        },
        httpMethod: {
            type: "string",
        },
        path: {
            type: "string",
        },
        queryStringParameters: {
            type: "object",
            properties: {},
        },
        headers: {
            type: "object",
            properties: {
                Accept: {
                    type: "string",
                },
                "Accept-Encoding": {
                    type: "string",
                },
                "Accept-Language": {
                    type: "string",
                },
                Connection: {
                    type: "string",
                },
                Host: {
                    type: "string",
                },
                "Upgrade-Insecure-Requests": {
                    type: "string",
                },
                "User-Agent": {
                    type: "string",
                },
            },
        },
        body: {
            type: "string",
        },
        isBase64Encoded: {
            type: "boolean",
        }
    },
    required: [
        "requestContext",
        "httpMethod",
        "path",
        "queryStringParameters",
        "headers",
        "body",
        "isBase64Encoded"
    ],
};
