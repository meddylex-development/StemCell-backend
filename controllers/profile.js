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
    profile_.save((err, profileSaved) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", stateRequest: false });
        } else {
            if (profileSaved) {
                res.status(200).send({ data: profileSaved, stateRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el perfil", stateRequest: false });
            }
        }
    });
};
/* *********** END - Add new profile method *********** */
/* ********** START - List all profiles method ********** */
const listProfiles = (req, res) => {
    let name = req.params["name"];
    Profile.find({ name: new RegExp(name, "i") }, (err, dataProfile) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", stateRequest: false });
        } else {
          if (dataProfile) {
            res.status(200).send({ data: dataProfile, stateRequest: true });
          } else {
            res.status(401).send({ data: "No existen perfiles", stateRequest: false });
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
            idState: params.idState, 
            name: params.name, 
            description: params.description, 
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataProfile) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", stateRequest: false });
            } else {
                if (dataProfile) {
                    res.status(200).send({ data: dataProfile, stateRequest: true });
                } else {
                    res.status(403).send({ data: "El perfil no se pudo actualizar", stateRequest: false });
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
        (err, dataProfile) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", stateRequest: false });
            } else {
                if (dataProfile) {
                    res.status(200).send({ data: dataProfile, stateRequest: true });
                } else {
                    res.status(403).send({ data: "El perfil no se pudo eliminar", stateRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete profile method *********** */

module.exports = {
    addProfile,
    listProfiles,
    listProfileByID,
    updateProfile,
    deleteProfile,
};