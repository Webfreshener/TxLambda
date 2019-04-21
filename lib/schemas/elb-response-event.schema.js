module.exports = {
    $schema: "http://json-schema.org/draft-04/schema#",
    type: "object",
    properties: {
        statusCode: {
            type: "integer",
        },
        statusDescription: {
            type: "string",
        },
        isBase64Encoded: {
            type: "boolean",
        },
        headers: {
            type: "object",
            properties: {
                "Content-Type": {
                    type: "string",
                },
            },
            required: [
                "Content-Type",
            ],
        },
        body: {
            type: "string",
        },
    },
    required: [
        "statusCode",
        "isBase64Encoded",
        "headers",
        "body",
    ],
};
