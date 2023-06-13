let express = require("express");
let Develop = require("../controllers/develop");
let Auth = require("../middlewares/auth");

// Importamos libreria para la carga de archivos multiparty
let multiparty = require("connect-multiparty");

// Importamos modulo path por medio del multiparty
let path = multiparty({ load: "../../assets/uploads" }); // Middleware para cargar archivos


let api = express.Router();

api.get(
    "/dev/getNewToken", 
    // Auth, 
    Develop.getNewToken
);
api.post(
    "/dev/uploadFile", 
    Auth, 
    path, 
    Develop.uploadFile
);
api.post(
    "/dev/readExcelFile", 
    // Auth, 
    Develop.readExcelFile
);
api.post(
    "/dev/uploadAndReadExcelFile", 
    // Auth, 
    path, 
    Develop.uploadAndReadExcelFile
);
api.post(
    "/dev/uploadFileAndSaveBlob", 
    Auth, 
    path, 
    Develop.uploadFileAndSaveBlob
);
api.post(
    "/dev/sendMail", 
    // Auth, 
    // path, 
    Develop.sendMail,
);

// api.post(
//     "/dev/", 
//     // Auth, 
//     Status.addStatus
// );

module.exports = api;