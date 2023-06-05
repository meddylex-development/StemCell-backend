let moment = require("moment");
let Status = require("../models/status");
let Utils = require("../utils/utils");

/* ********** START - Add new status method ********** */
const addStatus = async (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let status_ = new Status();
    status_.name = params.name;
    status_.description = params.description;
    status_.dateCreated = dateNow;
    status_.dateUpdated = dateNow;
    status_.save((err, statusSaved) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (statusSaved) {
                res.status(200).send({ data: statusSaved, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el estado", statusRequest: false });
            }
        }
    });

};
/* *********** END - Add new status method *********** */
/* ********** START - List all status method ********** */
const listStatus = async (req, res) => {

    let name = req.params["name"];
    // console.log('req.params: ', req.params);
    Status.find({ name: new RegExp(name, "i") }, (err, dataStatus) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataStatus) {
            res.status(200).send({ data: dataStatus, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen estados", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all status method *********** */
/* ********** START - List status by id method ********** */
const listStatusByID = (req, res) => {
    let id = req.params["id"];
    console.log('req.params: ', req.params);
    Status.find({ _id: id }, (err, dataResponse) => {
        console.log('dataResponse: ', dataResponse);
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen estados", statusRequest: false });
          }
        }
    });
};
/* *********** END - List status by id method *********** */
/* ********** START - Update status method ********** */
const updateStatus = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Status.findByIdAndUpdate(
        { _id: id },
        { 
            name: params.name, 
            description: params.description, 
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataStatus) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataStatus) {
                    res.status(200).send({ data: dataStatus, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El estado no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update status method *********** */
/* ********** START - Delete status method ********** */
const deleteStatus = (req, res) => {
    let id = req.params["id"];
    console.log('id: ', id);
    // let params = req.body;
    Status.deleteOne(
        { _id: id }, 
        (err, dataStatus) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataStatus) {
                    res.status(200).send({ data: dataStatus, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El estado no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete status method *********** */
/* ********** START - Delete all status method ********** */
const deleteAllStatus = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Status.deleteMany(
        {}, 
        (err, dataStatus) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataStatus) {
                    res.status(200).send({ data: dataStatus, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los estados", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all status method *********** */

module.exports = {
    addStatus,
    listStatus,
    listStatusByID,
    updateStatus,
    deleteStatus,
    deleteAllStatus,
};