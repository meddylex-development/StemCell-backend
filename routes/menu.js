let express = require("express");
let Menu = require("../controllers/menu");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/menu", Auth, Menu.addMenu);
api.get("/menu", Auth, Menu.listMenus);
api.get("/menu/:id?", Auth, Menu.listMenuByID);
api.post("/menu/:name?", Auth, Menu.listMenus);
api.put("/menu/:id", Auth, Menu.updateMenu);
api.delete("/menu/:id", Auth, Menu.deleteMenu);

module.exports = api;