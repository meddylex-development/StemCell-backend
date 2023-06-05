let moment = require("moment");
let AuditTrack = require("../models/auditTrack");
let Utils = require("../utils/utils");

/* ********** START - Add new audit track action method ********** */
const addAuditTrack = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let auditTrack_ = new AuditTrack();
    auditTrack_.idUser = params.idUser;
    auditTrack_.idStatus = params.idStatus;
    auditTrack_.module = params.module;
    auditTrack_.description = params.description;
    auditTrack_.dateCreated = dateNow;
    auditTrack_.dateUpdated = dateNow;
    auditTrack_.save((err, auditTrackSaved) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (auditTrackSaved) {
                res.status(200).send({ data: auditTrackSaved, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la accion de auditoria", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new audit track action method *********** */
/* ********** START - List all track actions method ********** */
const listAuditTrack = (req, res) => {
    let description = req.params["description"];
    AuditTrack.find({ description: new RegExp(description, "i") }, (err, dataAuditTrack) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataAuditTrack) {
            res.status(200).send({ data: dataAuditTrack, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen registros de auditoria", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all track actions method *********** */
/* ********** START - List audit track by id method ********** */
const listAuditTrackByID = (req, res) => {
    let id = req.params["id"];
    AuditTrack.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe registro de auditoria con ese identificador", statusRequest: false });
          }
        }
    });
};
/* *********** END - List audit track by id method *********** */
/* ********** START - Update audit track action method ********** */
const updateAuditTrack = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    AuditTrack.findByIdAndUpdate(
        { _id: id },
        { 
            idUser: params.idUser,
            idStatus: params.idStatus,
            module: params.module,
            description: params.description,
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataAuditTrack) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataAuditTrack) {
                    res.status(200).send({ data: dataAuditTrack, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El estado no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update audit track action method *********** */
/* ********** START - Delete audit track action method ********** */
const deleteAuditTrack = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    AuditTrack.deleteOne(
        { _id: id }, 
        (err, dataAuditTrack) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataAuditTrack) {
                    res.status(200).send({ data: dataAuditTrack, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El registro de auditoria no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete audit track action method *********** */
/* ********** START - Delete all status method ********** */
const deleteAllAuditTrack = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    AuditTrack.deleteMany(
        {}, 
        (err, dataAuditTrack) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataAuditTrack) {
                    res.status(200).send({ data: dataAuditTrack, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los estados", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all status method *********** */

module.exports = {
    addAuditTrack,
    listAuditTrack,
    listAuditTrackByID,
    updateAuditTrack,
    deleteAuditTrack,
    deleteAllAuditTrack,
};