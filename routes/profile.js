let express = require("express");
let Profile = require("../controllers/profile");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/profile", Auth, Profile.addProfile);
api.get("/profile", Auth, Profile.listProfiles);
api.get("/profile/:id?", Auth, Profile.listProfileByID);
api.post("/profile/:name?", Auth, Profile.listProfiles);
api.put('/profile/:id', Auth, Profile.updateProfile);
api.delete('/profile/:id', Auth, Profile.deleteProfile);

module.exports = api;