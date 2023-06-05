let moment = require("moment");
let DocumentType = require("../models/documentType");
let Utils = require("../utils/utils");

/* ********** START - Add new document type method ********** */
const addDocumentType = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let documentType_ = new DocumentType();
    documentType_.idStatus = params.idStatus;
    documentType_.name = params.name;
    documentType_.description = params.description;
    documentType_.dateCreated = dateNow;
    documentType_.dateUpdated = dateNow;
    documentType_.save((err, documentTypeSaved) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (documentTypeSaved) {
                res.status(200).send({ data: documentTypeSaved, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el tipo de documento", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new document type method *********** */
/* ********** START - List all document type method ********** */
const listDocumentTypes = (req, res) => {
    let name = req.params["name"];
    DocumentType.find({ name: new RegExp(name, "i") }, (err, dataDocumentType) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataDocumentType) {
            res.status(200).send({ data: dataDocumentType, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen estados", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all document type method *********** */
/* ********** START - List document type by id method ********** */
const listDocumentTypeByID = (req, res) => {
    let id = req.params["id"];
    console.log('req.params: ', req.params);
    DocumentType.find({ _id: id }, (err, dataResponse) => {
        console.log('dataResponse: ', dataResponse);
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen tipos de documento", statusRequest: false });
          }
        }
    });
};
/* *********** END - List document type by id method *********** */
/* ********** START - Update document type method ********** */
const updateDocumentType = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    DocumentType.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus, 
            name: params.name, 
            description: params.description, 
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataDocumentType) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataDocumentType) {
                    res.status(200).send({ documentType: dataDocumentType, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El estado no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update document type method *********** */
/* ********** START - Delete document type method ********** */
const deleteDocumentType = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    DocumentType.deleteOne(
        { _id: id }, 
        (err, dataDocumentType) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataDocumentType) {
                    res.status(200).send({ documentType: dataDocumentType, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El estado no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete document type method *********** */

module.exports = {
    addDocumentType,
    listDocumentTypes,
    listDocumentTypeByID,
    updateDocumentType,
    deleteDocumentType,
};