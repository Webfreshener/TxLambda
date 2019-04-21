module.exports = {
    definitions: {},
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "root#",
    type: "object",
    title: "The Root Schema",
    required: [
        "Records"
    ],
    properties: {
        Records: {
            $id: "#/properties/Records",
            type: "array",
            title: "The Records Schema",
            items: {
                $id: "#/properties/Records/items",
                type: "object",
                title: "The Items Schema",
                required: [
                    "eventVersion",
                    "eventSource",
                    "awsRegion",
                    "eventTime",
                    "eventName",
                    "userIdentity",
                    "requestParameters",
                    "responseElements",
                    "s3"
                ],
                properties: {
                    eventVersion: {
                        $id: "#/properties/Records/items/properties/eventVersion",
                        type: "string",
                        title: "The Eventversion Schema",
                        default: "",
                        examples: [
                            "2.1"
                        ],
                        pattern: "^(.*)$"
                    },
                    eventSource: {
                        $id: "#/properties/Records/items/properties/eventSource",
                        type: "string",
                        title: "The Eventsource Schema",
                        default: "",
                        examples: [
                            "aws:s3"
                        ],
                        pattern: "^(.*)$"
                    },
                    awsRegion: {
                        $id: "#/properties/Records/items/properties/awsRegion",
                        type: "string",
                        title: "The Awsregion Schema",
                        default: "",
                        examples: [
                            "us-east-1"
                        ],
                        pattern: "^(.*)$"
                    },
                    eventTime: {
                        $id: "#/properties/Records/items/properties/eventTime",
                        type: "string",
                        title: "The Eventtime Schema",
                        default: "",
                        examples: [
                            "1970-01-01T00:00:00.000Z"
                        ],
                        pattern: "^(.*)$"
                    },
                    eventName: {
                        $id: "#/properties/Records/items/properties/eventName",
                        type: "string",
                        title: "The Eventname Schema",
                        default: "",
                        examples: [
                            "ObjectCreated:Put"
                        ],
                        pattern: "^(.*)$"
                    },
                    userIdentity: {
                        $id: "#/properties/Records/items/properties/userIdentity",
                        type: "object",
                        title: "The Useridentity Schema",
                        required: [
                            "principalId"
                        ],
                        properties: {
                            principalId: {
                                $id: "#/properties/Records/items/properties/userIdentity/properties/principalId",
                                type: "string",
                                title: "The Principalid Schema",
                                default: "",
                                examples: [
                                    "AIDAJDPLRKLG7UEXAMPLE"
                                ],
                                pattern: "^(.*)$"
                            }
                        }
                    },
                    requestParameters: {
                        $id: "#/properties/Records/items/properties/requestParameters",
                        type: "object",
                        title: "The Requestparameters Schema",
                        required: [
                            "sourceIPAddress"
                        ],
                        properties: {
                            sourceIPAddress: {
                                $id: "#/properties/Records/items/properties/requestParameters/properties/sourceIPAddress",
                                type: "string",
                                title: "The Sourceipaddress Schema",
                                default: "",
                                examples: [
                                    "127.0.0.1"
                                ],
                                pattern: "^(.*)$"
                            }
                        }
                    },
                    responseElements: {
                        $id: "#/properties/Records/items/properties/responseElements",
                        type: "object",
                        title: "The Responseelements Schema",
                        required: [
                            "x-amz-request-id",
                            "x-amz-id-2"
                        ],
                        properties: {
                            "x-amz-request-id": {
                                $id: "#/properties/Records/items/properties/responseElements/properties/x-amz-request-id",
                                type: "string",
                                title: "The X-amz-request-id Schema",
                                default: "",
                                examples: [
                                    "C3D13FE58DE4C810"
                                ],
                                pattern: "^(.*)$"
                            },
                            "x-amz-id-2": {
                                $id: "#/properties/Records/items/properties/responseElements/properties/x-amz-id-2",
                                type: "string",
                                title: "The X-amz-id-2 Schema",
                                default: "",
                                examples: [
                                    "FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD"
                                ],
                                pattern: "^(.*)$"
                            }
                        }
                    },
                    s3: {
                        $id: "#/properties/Records/items/properties/s3",
                        type: "object",
                        title: "The S3 Schema",
                        required: [
                            "s3SchemaVersion",
                            "configurationId",
                            "bucket",
                            "object"
                        ],
                        properties: {
                            s3SchemaVersion: {
                                $id: "#/properties/Records/items/properties/s3/properties/s3SchemaVersion",
                                type: "string",
                                title: "The S3schemaversion Schema",
                                default: "",
                                examples: [
                                    "1.0"
                                ],
                                pattern: "^(.*)$"
                            },
                            configurationId: {
                                $id: "#/properties/Records/items/properties/s3/properties/configurationId",
                                type: "string",
                                title: "The Configurationid Schema",
                                default: "",
                                examples: [
                                    "testConfigRule"
                                ],
                                pattern: "^(.*)$"
                            },
                            bucket: {
                                $id: "#/properties/Records/items/properties/s3/properties/bucket",
                                type: "object",
                                title: "The Bucket Schema",
                                required: [
                                    "name",
                                    "ownerIdentity",
                                    "arn"
                                ],
                                properties: {
                                    name: {
                                        $id: "#/properties/Records/items/properties/s3/properties/bucket/properties/name",
                                        type: "string",
                                        title: "The Name Schema",
                                        default: "",
                                        examples: [
                                            "apwg-dev-crypto-data"
                                        ],
                                        pattern: "^(.*)$"
                                    },
                                    ownerIdentity: {
                                        $id: "#/properties/Records/items/properties/s3/properties/bucket/properties/ownerIdentity",
                                        type: "object",
                                        title: "The Owneridentity Schema",
                                        required: [
                                            "principalId"
                                        ],
                                        properties: {
                                            principalId: {
                                                $id: "#/properties/Records/items/properties/s3/properties/bucket/properties/ownerIdentity/properties/principalId",
                                                type: "string",
                                                title: "The Principalid Schema",
                                                default: "",
                                                examples: [
                                                    "A3NL1KOZZKExample"
                                                ],
                                                pattern: "^(.*)$"
                                            }
                                        }
                                    },
                                    arn: {
                                        $id: "#/properties/Records/items/properties/s3/properties/bucket/properties/arn",
                                        type: "string",
                                        title: "The Arn Schema",
                                        default: "",
                                        examples: [
                                            "arn:aws:s3:::apwg-dev-crypto-data"
                                        ],
                                        pattern: "^(.*)$"
                                    }
                                }
                            },
                            object: {
                                $id: "#/properties/Records/items/properties/s3/properties/object",
                                type: "object",
                                title: "The Object Schema",
                                required: [
                                    "key",
                                    "size",
                                    "eTag",
                                    "versionId",
                                    "sequencer"
                                ],
                                properties: {
                                    key: {
                                        $id: "#/properties/Records/items/properties/s3/properties/object/properties/key",
                                        type: "string",
                                        title: "The Key Schema",
                                        default: "",
                                        examples: [
                                            "test/cryptocurrency.xlsx"
                                        ],
                                        pattern: "^(.*)$"
                                    },
                                    size: {
                                        $id: "#/properties/Records/items/properties/s3/properties/object/properties/size",
                                        type: "integer",
                                        title: "The Size Schema",
                                        default: 0,
                                        examples: [
                                            218695
                                        ]
                                    },
                                    eTag: {
                                        $id: "#/properties/Records/items/properties/s3/properties/object/properties/eTag",
                                        type: "string",
                                        title: "The Etag Schema",
                                        default: "",
                                        examples: [
                                            "d41d8cd98f00b204e9800998ecf8427e"
                                        ],
                                        pattern: "^(.*)$"
                                    },
                                    versionId: {
                                        $id: "#/properties/Records/items/properties/s3/properties/object/properties/versionId",
                                        type: "string",
                                        title: "The Versionid Schema",
                                        default: "",
                                        examples: [
                                            "096fKKXTRTtl3on89fVO.nfljtsv6qko"
                                        ],
                                        pattern: "^(.*)$"
                                    },
                                    sequencer: {
                                        $id: "#/properties/Records/items/properties/s3/properties/object/properties/sequencer",
                                        type: "string",
                                        title: "The Sequencer Schema",
                                        default: "",
                                        examples: [
                                            "0055AED6DCD90281E5"
                                        ],
                                        pattern: "^(.*)$"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
