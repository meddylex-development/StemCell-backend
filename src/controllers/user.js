let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let User = require("../models/user");
let Utils = require("../utils/utils");

/* ********** START - Add new user method ********** */
const addUser = async (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let user_ = new User();
    if (
        params.idStatus &&
        params.idProfile &&
        params.idDocumentType && 
        params.idCountry && 
        params.idCity && 
        params.idLanguage && 
        params.idFile && 
        params.idAddress && 
        params.verifiedAccount && 
        params.sessionStatus && 
        params.firstName && 
        params.secondFirstName &&
        params.lastName &&
        params.secondLastName &&
        params.documentNumber &&
        params.email &&
        params.password &&
        params.address &&
        params.phoneNumber &&
        params.birthDate
    ) {
      bcrypt.hash(params.password, null, null, (err, hash) => {
        if (hash) {
            user_.idStatus = params.idStatus;
            user_.idProfile = params.idProfile;
            user_.idDocumentType = params.idDocumentType;
            user_.idCountry = params.idCountry;
            user_.idCity = params.idCity;
            user_.idLanguage = params.idLanguage;
            user_.idFile = params.idFile;
            user_.idAddress = params.idAddress;
            user_.verifiedAccount = false;
            // user_.verifiedAccount = params.verifiedAccount;
            user_.sessionStatus = false;
            // user_.sessionStatus = params.firstName;
            user_.firstName = params.firstName;
            user_.secondFirstName = params.secondFirstName;
            user_.lastName = params.lastName;
            user_.secondLastName = params.secondLastName;
            user_.documentNumber = params.documentNumber;
            user_.email = params.email;
            user_.password = hash;
            user_.address = params.address;
            user_.phoneNumber = params.phoneNumber;
            user_.birthDate = params.birthDate;
            user_.dateCreated = dateNow;
            user_.dateUpdated = dateNow;
            user_.save((err, dataResponse) => {
                if (err) {
                    res.status(500).send({ data: "No se registro el usuario", statusRequest: false });
                } else {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                }
            });
        }
      });
    } else {
        res.status(405).send({ data: "No se guardo un dato", statusRequest: false });
    }

};
/* *********** END - Add new user method *********** */
/* ********** START - List all users method ********** */
const listUser = (req, res) => {
    let documentNumber = req.params["documentNumber"];
    User.find({ documentNumber: new RegExp(documentNumber, "i") }, (err, dataResponse) => {
        if (err) {
            res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
            if (dataResponse) {
                res.status(200).send({ data: dataResponse, statusRequest: true });
            } else {
                res.status(401).send({ data: "No existe el usuario", statusRequest: false });
            }
        }
    });
};
/* *********** END - List all users method *********** */
/* ********** START - List user by id method ********** */
const listUserByID = (req, res) => {
    let id = req.params["id"];
    User.find({ _id: id }, (err, dataResponse) => {
        if (err) {
          res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
        } else {
          if (dataResponse) {
            res.status(200).send({ data: dataResponse, statusRequest: true });
          } else {
            res.status(401).send({ data: "No existe el usuario", statusRequest: false });
          }
        }
    });
};
/* *********** END - List user by id method *********** */
/* ********** START - Update user method ********** */
const updateUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    User.findByIdAndUpdate(
        { _id: id },
        { 
            idStatus: params.idStatus,
            idProfile: params.idProfile,
            idDocumentType: params.idDocumentType,
            idCountry: params.idCountry,
            idCity: params.idCity,
            idLanguage: params.idLanguage,
            idFile: params.idFile,
            idAddress: params.idAddress,
            verifiedAccount: false,
            sessionStatus: false,
            firstName: params.firstName,
            secondFirstName: params.secondFirstName,
            lastName: params.lastName,
            secondLastName: params.secondLastName,
            documentNumber: params.documentNumber,
            email: params.email,
            address: params.address,
            phoneNumber: params.phoneNumber,
            birthDate: params.birthDate,
            // dateCreated: parseInt(params.dateCreated), 
            dateUpdated: dateNow, 
        }, (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El usuario no se pudo actualizar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Update user method *********** */
/* ********** START - Delete user method ********** */
const deleteUser = (req, res) => {
    let id = req.params["id"];
    let params = req.body;
    User.deleteOne(
        { _id: id }, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "El usuario no se pudo eliminar", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete user method *********** */
/* ********** START - Delete all status method ********** */
const deleteAllUser = (req, res) => {
    // let id = req.params["id"];
    let params = req.body;
    console.log('params: ', params);
    return false;
    User.deleteMany(
        {}, 
        (err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(403).send({ data: "No se pudo eliminar los usuarios", statusRequest: false });
                }
            }
        }
    );
};
/* *********** END - Delete all status method *********** */

module.exports = {
    addUser,
    listUser,
    listUserByID,
    updateUser,
    deleteUser,
    deleteAllUser,
};