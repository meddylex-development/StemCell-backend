let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");
let User = require("../models/user");
let Utils = require("../utils/utils");

/* ********** START - Sign in user method ********** */
const userSignIn = (req, res) => {
    let params = req.body;
    User.findOne({ email: params.email }, (err, dataUser) => {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (dataUser) {
                bcrypt.compare(params.password, dataUser.password, async (err, successDataCompare) => {
                    if (successDataCompare) {
                        if (dataUser.idStatus) {
                            if (params.getToken) {
                                let dateExpired = moment().add(10, "days").add(1, "minutes").valueOf();
                                let objUser = { 
                                    _id: dataUser._id, 
                                    email: dataUser.email 
                                };
                                let dataToken = await Utils.createToken(objUser, dateExpired)
                                if (!dataToken) {
                                    res.status(500).send({ data: "Error al generar el token", statusRequest: false });
                                } else {
                                    // res.status(200).send({ token: `Bearer ${ dataToken.data }`, payload: dataToken.data, dateCreated: dateCreatedFormat, dateExpired: dateExpiredFormat, statusRequest: true });
                                    res.status(200).send({ jwt: dataToken.data, user: dataUser, statusRequest: true });
                                }
                            } else {
                                res.status(200).send({ data: dataUser, mensaje: "Sin token", statusRequest: false });
                            }
                        } else {
                            res.status(206).send({ data: dataUser, mensaje: "Usuario Inactivo", statusRequest: false });
                        }
                    } else {
                        res.status(401).send({ data: "Correo o Clave erronea", statusRequest: false });
                    }
                });
            } else {
                res.status(401).send({ data: "Correo o Clave erronea", statusRequest: false });
            }
        }
    });
};
/* *********** END - Sign in user method *********** */
/* ********** START - Add new user method ********** */
const userSignUp = (req, res) => {
    let params = req.body;
    let dateNow = Utils.getDateNowMilisec();
    let user_ = new User();
    if (
        params.idStatus &&
        params.idProfile &&
        params.firstName &&
        params.secondFirstName &&
        params.lastName &&
        params.secondLastName &&
        params.idDocumentType && 
        params.idCountry && 
        params.idCity && 
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
            user_.firstName = params.firstName;
            user_.secondFirstName = params.secondFirstName;
            user_.lastName = params.lastName;
            user_.secondLastName = params.secondLastName;
            user_.idDocumentType = params.idDocumentType;
            user_.idCountry = params.idCountry;
            user_.idCity = params.idCity;
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
module.exports = {
    userSignIn,
    userSignUp,
};