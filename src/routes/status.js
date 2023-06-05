let express = require("express");
let Status = require("../controllers/status");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/status", Auth, Status.addStatus);
api.get("/status", Auth, Status.listStatus);
api.get("/status/:id?", Auth, Status.listStatusByID);
api.post("/status/:name?", Auth, Status.listStatus);
api.put("/status/:id", Auth, Status.updateStatus);
api.delete("/status/:id", Auth, Status.deleteStatus);
api.delete("/status", Auth, Status.deleteAllStatus);

module.exports = api;