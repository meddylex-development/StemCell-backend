let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let jwt = require("../libs/jwt");
let User = require("../models/user");
let Utils = require("../utils/utils");

/* ********** START - Activate account method ********** */
const userActivateAccount = async (req, res) => {
    let token = req.params["token"];
    let isValidToken = await Utils.verifyToken(token);
    if (!isValidToken.statusRequest) {
        res.status(500).send({ data: isValidToken.data, statusRequest: false });
    } else {
        res.status(200).send({ data: isValidToken, statusRequest: true });
    }
};
/* *********** END - Activate account method *********** */
/* ********** START - Sign in user method ********** */
const userSignIn = (req, res) => {
    let params = req.body;
    User.findOne({ email: params.email }, (err, dataUser) => {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (dataUser) {
                bcrypt.compare(params.password, dataUser.password, (err, successDataCompare) => {
                    if (successDataCompare) {
                        if (dataUser.idStatus) {
                            if (params.getToken) {

                                User.findByIdAndUpdate(
                                    { _id: dataUser._id }, 
                                    { sessionStatus: true }, async (err, response) => {
                                    if (err) {
                                        res.status(500).send({ data: "Error al generar el token", statusRequest: false });
                                    } else {
                                        
                                        let dateExpired = moment().add(10, "days").add(1, "minutes").valueOf();
                                        let objUser = { 
                                            _id: dataUser._id, 
                                            idStatus: dataUser.idStatus,
                                            verifiedAccount: dataUser.verifiedAccount,
                                            email: dataUser.email,
                                        };
                                        let dataToken = await Utils.createToken(objUser, dateExpired);
                                        let test = { _id, idStatus, idProfile, email, firstName, lastName, sessionStatus} = dataUser;
                                        if (!dataToken) {
                                            res.status(500).send({ data: "Error al generar el token", statusRequest: false });
                                        } else {
                                            // res.status(200).send({ token: `Bearer ${ dataToken.data }`, payload: dataToken.data, dateCreated: dateCreatedFormat, dateExpired: dateExpiredFormat, statusRequest: true });
                                            res.status(200).send({ 
                                                jwt: dataToken.data, 
                                                user: { 
                                                    _id: dataUser._id, 
                                                    idStatus: dataUser.idStatus,
                                                    idProfile: dataUser.idProfile,
                                                    email: dataUser.email, 
                                                    firstName: dataUser.firstName, 
                                                    lastName: dataUser.lastName, 
                                                    sessionStatus: dataUser.sessionStatus, 
                                                    profilePicture: "http://meddylex-001-site7.atempurl.com/assets/images/avatar-default.jpg",
                                                }, statusRequest: true });
                                        }
                                        
                                    }
                                });
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
        // params.idProfile && 
        params.idDocumentType && 
        params.idCountry && 
        params.idCity && 
        // params.idLanguage && 
        // params.idFile && 
        // params.idAddress && 
        // params.verifiedAccount && 
        // params.sessionStatus && 
        params.firstName &&
        params.secondFirstName &&
        params.lastName &&
        params.secondLastName &&
        params.documentNumber &&
        params.email &&
        params.password &&
        // params.address && 
        // params.phoneNumber && 
        params.birthDate
    ) {
      bcrypt.hash(params.password, null, null, (err, hash) => {
        if (hash) {
            user_.idStatus = "647a73a6d47ece6731a4d979";
            // user_.idStatus = params.idStatus;
            user_.idProfile = "6483fecbaf1928599d9e5136";
            // user_.idProfile = params.idProfile;
            user_.idDocumentType = params.idDocumentType;
            user_.idCountry = params.idCountry;
            user_.idCity = params.idCity;
            user_.idLanguage = "648163305bb401e67e7a7c1c";
            // user_.idLanguage = params.idLanguage;
            user_.idFile = "6484024070269c59deb2db51";
            // user_.idFile = params.idFile;
            // user_.idAddress = params.idAddress;
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
module.exports = {
    userActivateAccount,
    userSignIn,
    userSignUp,
};