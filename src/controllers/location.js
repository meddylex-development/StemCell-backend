let moment = require("moment");
let Location = require("../models/location");
let Utils = require("../utils/utils");

/* ********** START - Add new location method ********** */
const addLocation = (req, res) => { 
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let location_ = new Location();
    location_.idStatus = params.idStatus;
    location_.idCity = params.idCity;
    location_.idCountry = params.idCountry;
    location_.latitude = params.latitude;
    location_.longitude = params.longitude;
    location_.name = params.name;
    location_.description = params.description;
    location_.dateCreated = dateNow;
    location_.dateUpdated = dateNow;
    location_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la localizacion", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new location method *********** */
/* ********** START - List all locations method ********** */
const listLocations = (req, res) => {
    let name = req.params["name"];
    Location.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen localizaciones", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all locations method *********** */
/* ********** START - List location by id method ********** */
const listLocationByID = (req, res) => {
    let id = req.params["id"];
    Location.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen localizaciones", statusRequest: false });
          }
        }
    });
};
/* *********** END - List location by id method *********** */
/* ********** START - Update location method ********** */
const updateLocation = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Location.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus, 
            idCity: params.idCity,
            idCountry: params.idCountry,
            latitude: params.latitude,
            longitude: params.longitude,
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
                    res.status(403).send({ data: "La localizacion no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update location method *********** */
/* ********** START - Delete location method ********** */
const deleteLocation = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Location.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La localizacion no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete location method *********** */
/* ********** START - Delete all locations method ********** */
const deleteAllLocations = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Location.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las localizaciones", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all locations method *********** */

module.exports = {
    addLocation,
    listLocations,
    listLocationByID,
    updateLocation,
    deleteLocation,
    deleteAllLocations,
};