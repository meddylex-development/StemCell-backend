let moment = require("moment");
let File = require("../models/file");
let Utils = require("../utils/utils");

/* ********** START - Add new file method ********** */
const addFile = (req, res) => { 
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let file_ = new File();
    file_.idStatus = params.idStatus;
    file_.name = params.name;
    file_.originalName = params.originalName;
    file_.extension = params.extension;
    file_.location = params.location;
    file_.size = params.size;
    file_.description = params.description;
    file_.dateCreated = dateNow;
    file_.dateUpdated = dateNow;
    file_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el archivo", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new file method *********** */
/* ********** START - List all files method ********** */
const listFile = (req, res) => {
    let name = req.params["name"];
    File.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen archivos", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all files method *********** */
/* ********** START - List files by id method ********** */
const listFileByID = (req, res) => {
    let id = req.params["id"];
    File.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen archivos", statusRequest: false });
          }
        }
    });
};
/* *********** END - List files by id method *********** */
/* ********** START - Update file method ********** */
const updateFile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    File.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            name: params.name,
            originalName: params.originalName,
            extension: params.extension,
            location: params.location,
            size: params.size,
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
                    res.status(403).send({ data: "el archivo no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update file method *********** */
/* ********** START - Delete file method ********** */
const deleteFile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    File.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "el archivo no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete file method *********** */
/* ********** START - Delete all files method ********** */
const deleteAllFiles = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    File.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las archivos", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all files method *********** */

module.exports = {
    addFile,
    listFile,
    listFileByID,
    updateFile,
    deleteFile,
    deleteAllFiles,
};