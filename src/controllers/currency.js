let moment = require("moment");
let Currency = require("../models/currency");
let Utils = require("../utils/utils");

/* ********** START - Add new currency method ********** */
const addCurrency = (req, res) => { 
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let currency_ = new Currency();
    currency_.idStatus = params.idStatus;
    currency_.idCountry = params.idCountry;
    currency_.name = params.name;
    currency_.description = params.description;
    currency_.dateCreated = dateNow;
    currency_.dateUpdated = dateNow;
    currency_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la moneda", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new currency method *********** */
/* ********** START - List all currency method ********** */
const listCurrency = (req, res) => {
    let name = req.params["name"];
    Currency.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen monedas", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all currency method *********** */
/* ********** START - List currency by id method ********** */
const listCurrencyByID = (req, res) => {
    let id = req.params["id"];
    Currency.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen monedas", statusRequest: false });
          }
        }
    });
};
/* *********** END - List currency by id method *********** */
/* ********** START - Update currency method ********** */
const updateCurrency = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Currency.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus, 
            idCountry: params.idCountry,
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
                    res.status(403).send({ data: "La moneda no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update currency method *********** */
/* ********** START - Delete currency method ********** */
const deleteCurrency = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Currency.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La moneda no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete currency method *********** */
/* ********** START - Delete all currency method ********** */
const deleteAllCurrency = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Currency.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las monedas", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all currency method *********** */

module.exports = {
    addCurrency,
    listCurrency,
    listCurrencyByID,
    updateCurrency,
    deleteCurrency,
    deleteAllCurrency,
};