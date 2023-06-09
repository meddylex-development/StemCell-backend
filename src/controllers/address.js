let moment = require("moment");
let Address = require("../models/address");
let Utils = require("../utils/utils");

/* ********** START - Add new address method ********** */
const addAddress = (req, res) => { 
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let address_ = new Address();
    address_.idStatus = params.idStatus;
    address_.idCountry = params.idCountry;
    address_.idCity = params.idCity;
    address_.name = params.name;
    address_.description = params.description;
    address_.dateCreated = dateNow;
    address_.dateUpdated = dateNow;
    address_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la direccion", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new address method *********** */
/* ********** START - List all address method ********** */
const listAddress = (req, res) => {
    let name = req.params["name"];
    Address.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen direcciones", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all address method *********** */
/* ********** START - List address by id method ********** */
const listAddressByID = (req, res) => {
    let id = req.params["id"];
    Address.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen direcciones", statusRequest: false });
          }
        }
    });
};
/* *********** END - List address by id method *********** */
/* ********** START - Update address method ********** */
const updateAddress = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Address.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            idCountry: params.idCountry,
            idCity: params.idCity,
            name: params.name,
            description: params.description,
            // dateCreated: dateNow,
            dateUpdated: dateNow,
        }, (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La direccion no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update address method *********** */
/* ********** START - Delete address method ********** */
const deleteAddress = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Address.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La direccion no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete address method *********** */
/* ********** START - Delete all address method ********** */
const deleteAllAddress = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Address.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las direcciones", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all address method *********** */

module.exports = {
    addAddress,
    listAddress,
    listAddressByID,
    updateAddress,
    deleteAddress,
    deleteAllAddress,
};