let moment = require("moment");
let City = require("../models/city");
let Utils = require("../utils/utils");

/* ********** START - Add new city method ********** */
const addCity = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let city_ = new City();
    city_.idStatus = params.idStatus;
    city_.idCountry = params.idCountry;
    city_.name = params.name;
    city_.description = params.description;
    city_.dateCreated = dateNow;
    city_.dateUpdated = dateNow;
    city_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la ciudad", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new city method *********** */
/* ********** START - List all cities method ********** */
const listCities = (req, res) => {
    let name = req.params["name"];
    City.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen ciudades", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all cities method *********** */
/* ********** START - List all cities method ********** */
const listCityByID = (req, res) => {
    let id = req.params["id"];
    City.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe ciudad", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all cities method *********** */
/* ********** START - Update city method ********** */
const updateCity = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    City.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus, 
            name: params.name, 
            description: params.description, 
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La ciudad no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update city method *********** */
/* ********** START - Delete city method ********** */
const deleteCity = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    City.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La ciudad no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete city method *********** */
/* ********** START - Delete all cities method ********** */
const deleteAllCities = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    City.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las ciudades", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all cities method *********** */

module.exports = {
    addCity,
    listCities,
    listCityByID,
    updateCity,
    deleteCity,
    deleteAllCities,
};