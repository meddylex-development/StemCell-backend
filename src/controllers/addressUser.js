let moment = require("moment");
let AddressUser = require("../models/addressUser");
let Utils = require("../utils/utils");

/* ********** START - Add new address by user method ********** */
const addAddressUser = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let addressUser_ = new AddressUser();
    addressUser_.idStatus = params.idStatus;
    addressUser_.idAddress = params.idAddress;
    addressUser_.idUser = params.idUser;
    addressUser_.name = params.name;
    addressUser_.description = params.description;
    addressUser_.dateCreated = dateNow;
    addressUser_.dateUpdated = dateNow;
    addressUser_.save((err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No se pudo registrar la direccion por usuario", statusRequest: false });
            }
        }
    });
};
/* *********** END - Add new address by user method *********** */
/* ********** START - List all address by user method ********** */
const listAddressUser = (req, res) => {
    let name = req.params["name"];
    AddressUser.find({ name: new RegExp(name, "i") }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existen direcciones por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List all address by user method *********** */
/* ********** START - List address user by id method ********** */
const listAddressUserByID = (req, res) => {
    let id = req.params["id"];
    AddressUser.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe direcciones por usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List address user by id method *********** */
/* ********** START - Update address user by id method ********** */
const updateAddressUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    AddressUser.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            idAddress: params.idAddress,
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
                    res.status(403).send({ data: "La direccion por usuario no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update address user by id method *********** */
/* ********** START - Delete address by user method ********** */
const deleteAddressUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    AddressUser.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "La direccion por usuario no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete address by user method *********** */
/* ********** START - Delete all address by user method ********** */
const deleteAllAddressUser = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    
    return false;
    AddressUser.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar las direcciones por usuario", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all address by user method *********** */

module.exports = {
    addAddressUser,
    listAddressUser,
    listAddressUserByID,
    updateAddressUser,
    deleteAddressUser,
    deleteAllAddressUser,
};