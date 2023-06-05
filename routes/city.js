let express = require("express");
let City = require("../controllers/city");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/city", Auth, City.addCity);
api.get("/city", Auth, City.listCities);
api.get("/city/:id?", Auth, City.listCityByID);
api.post("/city/:name?", Auth, City.listCities);
api.put("/city/:id", Auth, City.updateCity);
api.delete("/city/:id", Auth, City.deleteCity);

module.exports = api;