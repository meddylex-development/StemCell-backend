let express = require("express");
let Country = require("../controllers/country");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/country", Auth, Country.addCountry);
api.get("/country", Auth, Country.listCountries);
api.get("/country/:id?", Auth, Country.listCountryByID);
api.post("/country/:name?", Auth, Country.listCountries);
api.put("/country/:id", Auth, Country.updateCountry);
api.delete("/country/:id", Auth, Country.deleteCountry);
api.delete("/country", Auth, Country.deleteAllCountries);

module.exports = api;