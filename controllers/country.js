let moment = require("moment");
let Country = require("../models/country");
let Utils = require("../utils/utils");

/* ********** START - Add new country method ********** */
const addCountry = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let country_ = new Country();
    country_.idStatus = params.idStatus;
    country_.name = params.name;
    country_.description = params.description;
    country_.dateCreated = dateNow;
    country_.dateUpdated = dateNow;
    country_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el país", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new country method *********** */
/* ********** START - List all countries method ********** */
const listCountries = (req, res) => {
    let name = req.params["name"];
    Country.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen paises", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all countries method *********** */
/* ********** START - List all states method ********** */
const listCountryByID = (req, res) => {
    let id = req.params["id"];
    console.log('req.params: ', req.params);
    Country.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe pais", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all states method *********** */
/* ********** START - Update country method ********** */
const updateCountry = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Country.findByIdAndUpdate(
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
                    res.status(403).send({ data: "El país no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update country method *********** */
/* ********** START - Delete country method ********** */
const deleteCountry = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Country.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El país no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete country method *********** */
/* ********** START - Delete all countries method ********** */
const deleteAllCountries = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Country.deleteMany(
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
/* *********** END - Delete all countries method *********** */

module.exports = {
    addCountry,
    listCountries,
    listCountryByID,
    updateCountry,
    deleteCountry,
    deleteAllCountries,
};