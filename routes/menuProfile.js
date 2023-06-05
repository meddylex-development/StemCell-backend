let express = require("express");
let MenuProfile = require("../controllers/menuProfile");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/menu-profile", Auth, MenuProfile.addMenuProfile);
api.get("/menu-profile", Auth, MenuProfile.listMenuProfiles);
api.get("/menu-profile/:id?", Auth, MenuProfile.listMenuProfileByID);
api.post("/menu-profile/:description?", Auth, MenuProfile.listMenuProfiles);
api.put("/menu-profile/:id", Auth, MenuProfile.updateMenuProfile);
api.delete("/menu-profile/:id", Auth, MenuProfile.deleteMenuProfile);

module.exports = api;