let moment = require("moment");
let MenuProfile = require("../models/menuProfile");
let Utils = require("../utils/utils");

/* ********** START - Add new menu by profile method ********** */
const addMenuProfile = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let menuProfile_ = new MenuProfile();
    menuProfile_.idProfile = params.idProfile;
    menuProfile_.idMenu = params.idMenu;
    menuProfile_.idStatus = params.idStatus;
    menuProfile_.description = params.description;
    menuProfile_.dateCreated = dateNow;
    menuProfile_.dateUpdated = dateNow;
    menuProfile_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el menu por perfil", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new menu by profile method *********** */
/* ********** START - List all menu by profile method ********** */
const listMenuProfiles = (req, res) => {
    let description = req.params["description"];
    MenuProfile.find({ description: new RegExp(description, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen menus por perfil", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all menu by profile method *********** */
/* ********** START - List menu by id method ********** */
const listMenuProfileByID = (req, res) => {
    let id = req.params["id"];
    MenuProfile.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe menu por perfil", statusRequest: false });
          }
        }
    });
};
/* *********** END - List menu by id method *********** */
/* ********** START - Update menu by profile method ********** */
const updateMenuProfile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    MenuProfile.findByIdAndUpdate(
        { _id: id },
        { 
            idProfile: params.idProfile, 
            idMenu: params.idMenu, 
            idStatus: params.idStatus, 
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
                    res.status(403).send({ data: "El menu por perfil no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update menu by profile method *********** */
/* ********** START - Delete menu by profile method ********** */
const deleteMenuProfile = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    MenuProfile.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El menu por perfil no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete menu by profile method *********** */
/* ********** START - Delete all menus by profile method ********** */
const deleteAllMenusProfile = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    MenuProfile.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los menus por perfil", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all menus by profile method *********** */

module.exports = {
    addMenuProfile,
    listMenuProfiles,
    listMenuProfileByID,
    updateMenuProfile,
    deleteMenuProfile,
    deleteAllMenusProfile,
};