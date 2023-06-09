let moment = require("moment");
let FileUser = require("../models/fileUser");
let Utils = require("../utils/utils");

/* ********** START - Add new file by user method ********** */
const addFileUser = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let fileUser_ = new FileUser();
    fileUser_.idStatus = params.idStatus;
    fileUser_.idFile = params.idFile;
    fileUser_.idUser = params.idUser;
    fileUser_.name = params.name;
    fileUser_.description = params.description;
    fileUser_.dateCreated = dateNow;
    fileUser_.dateUpdated = dateNow;
    fileUser_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el archivo por usuario", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new file by user method *********** */
/* ********** START - List all files by user method ********** */
const listFileUser = (req, res) => {
    let description = req.params["name"];
    FileUser.find({ description: new RegExp(description, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen archivos por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all files by user method *********** */
/* ********** START - List file user by id method ********** */
const listFileUserByID = (req, res) => {
    let id = req.params["id"];
    FileUser.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe archivos por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List file user by id method *********** */
/* ********** START - Update file user by id method ********** */
const updateFileUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    FileUser.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            idFile: params.idFile,
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
                    res.status(403).send({ data: "El archivo por usuario no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update file user by id method *********** */
/* ********** START - Delete file by user method ********** */
const deleteFileUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    FileUser.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El archivo por usuario no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete file by user method *********** */
/* ********** START - Delete all files by user method ********** */
const deleteAllFilesUser = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    
    return false;
    FileUser.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los archivos por usuario", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all files by user method *********** */

module.exports = {
    addFileUser,
    listFileUser,
    listFileUserByID,
    updateFileUser,
    deleteFileUser,
    deleteAllFilesUser,
};