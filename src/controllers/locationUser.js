let moment = require("moment");
let LocationUser = require("../models/locationUser");
let Utils = require("../utils/utils");

/* ********** START - Add new location by user method ********** */
const addLocationUser = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let locationUser_ = new LocationUser();
    locationUser_.idStatus = params.idStatus;
    locationUser_.idLocation = params.idLocation;
    locationUser_.idUser = params.idUser;
    locationUser_.name = params.name;
    locationUser_.description = params.description;
    locationUser_.dateCreated = dateNow;
    locationUser_.dateUpdated = dateNow;
    locationUser_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la ubicacion por usuario", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new location by user method *********** */
/* ********** START - List all locations by user method ********** */
const listLocationUser = (req, res) => {
    let description = req.params["name"];
    LocationUser.find({ description: new RegExp(description, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen localizaciones por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all locations by user method *********** */
/* ********** START - List language city by id method ********** */
const listLocationUserByID = (req, res) => {
    let id = req.params["id"];
    LocationUser.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe localizaciones por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List language city by id method *********** */
/* ********** START - Update language city by id method ********** */
const updateLocationUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    LocationUser.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            idLocation: params.idLocation,
            idUser: params.idUser,
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
                    res.status(403).send({ data: "La localizacion por usuario no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update language city by id method *********** */
/* ********** START - Delete location by user method ********** */
const deleteLocationUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    LocationUser.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La localizacion por usuario no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete location by user method *********** */
/* ********** START - Delete all locations by user method ********** */
const deleteAllLocationsUser = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    LocationUser.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los localizaciones por usuario", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all locations by user method *********** */

module.exports = {
    addLocationUser,
    listLocationUser,
    listLocationUserByID,
    updateLocationUser,
    deleteLocationUser,
    deleteAllLocationsUser,
};