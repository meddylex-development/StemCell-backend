let moment = require("moment");
let Profile = require("../models/profile");
let Utils = require("../utils/utils");

/* ********** START - Add new profile method ********** */
const addProfile = (req, res) => {
    let params = req.body;
    // console.log('params: ', params);
    // return false
    let dateNow = Utils.getDateNowMilisec();
    let profile_ = new Profile();
    profile_.idStatus = params.idStatus;
    profile_.name = params.name;
    profile_.description = params.description;
    profile_.dateCreated = dateNow;
    profile_.dateUpdated = dateNow;
    profile_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el perfil", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new profile method *********** */
/* ********** START - List all profiles method ********** */
const listProfiles = (req, res) => {
    let name = req.params["name"];
    Profile.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen perfiles", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all profiles method *********** */
/* ********** START - List profile by id method ********** */
const listProfileByID = (req, res) => {
    let id = req.params["id"];
    console.log('req.params: ', req.params);
    Profile.find({ _id: id }, (err, dataResponse) => {
        console.log('dataResponse: ', dataResponse);
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen perfiles", statusRequest: false });
          }
        }
    });
};
/* *********** END - List profile by id method *********** */
/* ********** START - Update profile method ********** */
const updateProfile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Profile.findByIdAndUpdate(
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
                    res.status(403).send({ data: "El perfil no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update profile method *********** */
/* ********** START - Delete profile method ********** */
const deleteProfile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Profile.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El perfil no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete profile method *********** */
/* ********** START - Delete all profiles method ********** */
const deleteAllProfiles = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Profile.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los perfiles", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all profiles method *********** */

module.exports = {
    addProfile,
    listProfiles,
    listProfileByID,
    updateProfile,
    deleteProfile,
    deleteAllProfiles,
};