let express = require("express");
let User = require("../controllers/user");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/user/sign-up", User.userSignUp);
api.post("/user/sign-in", User.userSignIn);
api.get("/user/list", Auth, User.userList);
api.post("/user/:documentNumber?", Auth, User.userList);
api.put("/user/:id", Auth, User.userUpdate);
api.delete("/user/:id", Auth, User.deleteUser);

module.exports = api;