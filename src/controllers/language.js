let moment = require("moment");
let Language = require("../models/language");
let Utils = require("../utils/utils");

/* ********** START - Add new language method ********** */
const addLanguage = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let language_ = new Language();
    language_.idStatus = params.idStatus;
    language_.name = params.name;
    language_.description = params.description;
    language_.dateCreated = dateNow;
    language_.dateUpdated = dateNow;
    language_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el lenguaje", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new language method *********** */
/* ********** START - List all languages method ********** */
const listLanguages = (req, res) => {
    let name = req.params["name"];
    Language.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen lenguajes", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all languages method *********** */
/* ********** START - List language by id method ********** */
const listLanguageByID = (req, res) => {
    let id = req.params["id"];
    Language.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen lenguajes", statusRequest: false });
          }
        }
    });
};
/* *********** END - List language by id method *********** */
/* ********** START - Update language method ********** */
const updateLanguage = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Language.findByIdAndUpdate(
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
                    res.status(403).send({ data: "El lenguaje no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update language method *********** */
/* ********** START - Delete language method ********** */
const deleteLanguage = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Language.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El lenguaje no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete language method *********** */
/* ********** START - Delete all languages method ********** */
const deleteAllLanguages = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Language.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los lenguajes", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all languages method *********** */

module.exports = {
    addLanguage,
    listLanguages,
    listLanguageByID,
    updateLanguage,
    deleteLanguage,
    deleteAllLanguages,
};