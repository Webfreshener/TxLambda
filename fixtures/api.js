const {APIEvent} = require("../index");
module.exports.handler = APIEvent(() => ({
    body: "A-OK",
}));
