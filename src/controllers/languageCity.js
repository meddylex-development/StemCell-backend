let moment = require("moment");
let LanguageCity = require("../models/languageCity");
let Utils = require("../utils/utils");

/* ********** START - Add new language by city method ********** */
const addLanguageCity = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let languageCity_ = new LanguageCity();
    languageCity_.idLanguage = params.idLanguage;
    languageCity_.idStatus = params.idStatus;
    languageCity_.idCity = params.idCity;
    languageCity_.idCountry = params.idCountry;
    languageCity_.description = params.description;
    languageCity_.dateCreated = dateNow;
    languageCity_.dateUpdated = dateNow;
    languageCity_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el lenguaje por ciudad", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new language by city method *********** */
/* ********** START - List all languages by city method ********** */
const listLanguageCity = (req, res) => {
    let description = req.params["description"];
    LanguageCity.find({ description: new RegExp(description, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen lenguajes por ciudad", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all languages by city method *********** */
/* ********** START - List language city by id method ********** */
const listLanguageCityByID = (req, res) => {
    let id = req.params["id"];
    LanguageCity.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe lenguajes por ciudad", statusRequest: false });
          }
        }
    });
};
/* *********** END - List language city by id method *********** */
/* ********** START - Update language city by id method ********** */
const updateLanguageCity = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    LanguageCity.findByIdAndUpdate(
        { _id: id },
        { 
            idLanguage: params.idLanguage,
            idStatus: params.idStatus,
            idCity: params.idCity,
            idCountry: params.idCountry,
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
                    res.status(403).send({ data: "El lenguaje por ciudad no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update language city by id method *********** */
/* ********** START - Delete language by city method ********** */
const deleteLanguageCity = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    LanguageCity.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El lenguaje por ciudad no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete language by city method *********** */
/* ********** START - Delete all languages by city method ********** */
const deleteAllLanguagesCity = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    LanguageCity.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los lenguajes por ciudad", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all languages by city method *********** */

module.exports = {
    addLanguageCity,
    listLanguageCity,
    listLanguageCityByID,
    updateLanguageCity,
    deleteLanguageCity,
    deleteAllLanguagesCity,
};