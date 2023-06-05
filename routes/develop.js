let express = require("express");
let Develop = require("../controllers/develop");
// let Auth = require("../middlewares/auth");
let api = express.Router();

api.get(
    "/dev/getNewToken", 
    // Auth, 
    Develop.getNewToken
);

// api.post(
//     "/dev/", 
//     // Auth, 
//     Status.addStatus
// );

module.exports = api;