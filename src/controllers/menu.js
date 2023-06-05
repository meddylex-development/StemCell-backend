let moment = require("moment");
let Menu = require("../models/menu");
let Utils = require("../utils/utils");

/* ********** START - Add new menu method ********** */
const addMenu = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let menu_ = new Menu();
    menu_.idStatus = params.idStatus;
    menu_.name = params.name;
    menu_.title = params.title;
    menu_.icon = params.icon;
    menu_.link = params.link;
    menu_.home = params.home;
    menu_.description = params.description;
    menu_.dateCreated = dateNow;
    menu_.dateUpdated = dateNow;
    menu_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar el menú", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new menu method *********** */
/* ********** START - List all menus method ********** */
const listMenus = (req, res) => {
    let name = req.params["name"];
    // console.log('name: ', name);
    Menu.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        // console.log('dataResponse: ', dataResponse);
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen menú", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all menus method *********** */
/* ********** START - List menu by id method ********** */
const listMenuByID = (req, res) => {
    let id = req.params["id"];
    // console.log('req.params: ', req.params);
    Menu.find({ _id: id }, (err, dataResponse) => {
        // console.log('dataResponse: ', dataResponse);
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen menus", statusRequest: false });
          }
        }
    });
};
/* *********** END - List menu by id method *********** */
/* ********** START - Update menu method ********** */
const updateMenu = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    Menu.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus, 
            name: params.name, 
            title: params.title, 
            icon: params.icon, 
            link: params.link, 
            home: params.home, 
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
                    res.status(403).send({ data: "El menu no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update menu method *********** */
/* ********** START - Delete menu method ********** */
const deleteMenu = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    Menu.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El menu no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete menu method *********** */
/* ********** START - Delete all menus method ********** */
const deleteAllMenus = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    Menu.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los menus", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all menus method *********** */

module.exports = {
    addMenu,
    listMenus,
    listMenuByID,
    updateMenu,
    deleteMenu,
    deleteAllMenus,
};