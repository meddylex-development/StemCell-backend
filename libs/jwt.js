// let jwt = require("jwt-simple");
let jwt = require("jsonwebtoken");
let moment = require("moment");
let secret = "BaseParkway-StemCell-2021*.";

exports.createToken = (user) => {
    let payload = {
        ...user,
        iat: moment().valueOf(),
        exp: moment().add(1, "days").valueOf(),
    };
    return jwt.sign(payload, secret);
};