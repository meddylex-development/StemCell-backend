let moment = require("moment");
let File = require("../models/file");
let Utils = require("../utils/utils");

// Importamos modulo node para el control de ficheros
let fs = require("fs");

// Importamos modulo path
let path = require("path");

/* ********** START - Crea un nuevo json web token ********** */
const getNewToken = async (req, res) => {
    // let params = req.body;
    // let dateNow = Utils.getDateNowMilisec();
    let dateNow = Utils.getDateNowMilisec();
    let data = {"_id": "6474e721d0177e6dea75f4b0",
        "name": "Usuario incognito de pruebas",
        "description": "Nuevo token para uso en consumo de apis",
        "use": "Development", 
        "verifiedAccount": true, 
        "dateCreated": dateNow,
        "dateUpdated": dateNow 
    };
    let dateExpired = moment().add(2, "days").add(1, "minutes").valueOf();
    let dateCreatedFormat = Utils.getDateFormat(dateNow, "DD MMMM YYYY, h:mm:ss a'");;
    let dateExpiredFormat = Utils.getDateFormat(dateExpired, "DD MMMM YYYY, h:mm:ss a'");
    let dataToken = await Utils.createToken(data, dateExpired);
    // return false;
    if (!dataToken) {
        res.status(500).send({ data: "Error al generar el token", statusRequest: false });
    } else {
        res.status(200).send({ token: `Bearer ${ dataToken.data }`, payload: dataToken.data, dateCreated: dateCreatedFormat, dateExpired: dateExpiredFormat, statusRequest: true });
        // if (statusSaved) {
        //     res.status(200).send({ data: statusSaved, statusRequest: true });
        // } else {
        //     res.status(401).send({ data: "No se pudo registrar el estado", statusRequest: false });
        // }
    }

};
/* *********** END - Crea un nuevo json web token *********** */
/* ********** START - Carga un archivo y luego lo almacena en el servidor en su version original ********** */
const uploadFile = async (req, res) => {
    let files = req.files;
    let savedFile = await Utils.storageFile(files.file, req.user);
    if (!savedFile.statusRequest) {
        res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
    } else {
        res.status(200).send({ data: savedFile.data, statusRequest: true });
    }
};
/* *********** END - Carga un archivo y luego lo almacena en el servidor en su version original *********** */
/* ********** START - Lee un archivo de excel desde una ubicacion en el servidor ********** */
const readExcelFile = async (req, res) => {

    let fileName = req.body.fileName;
    let fileExtension = req.body.fileExtension;
    
    let dataFile = await Utils.readXlsFile(`assets/uploads/temp/${ fileName }.${ fileExtension }`, false);
    if (!dataFile.statusRequest) {
        res.status(500).send({ data: "Error al leer el archivo! Es probable que no exista un archivo con ese nombre o extension.", statusRequest: false });
    } else {
        res.status(200).send({ data: dataFile.data, fileName: `${ fileName }`, fileExtension: fileExtension, statusRequest: true });
    }
    
};
/* *********** END - Lee un archivo de excel desde una ubicacion en el servidor *********** */
/* ********** START - Carga y Lee un archivo de excel ********** */
const uploadAndReadExcelFile = async (req, res) => {

    let tempFilePath = req.files.file.path;
    let originalFilename = req.files.file.originalFilename;
    let fileExtension = path.extname(tempFilePath);

    let dataFile = await Utils.readXlsFile(tempFilePath, true);
    if (!dataFile.statusRequest) {
        res.status(500).send({ data: "Error al leer el archivo", statusRequest: false });
    } else {
        res.status(200).send({ data: dataFile.data, fileName: originalFilename, fileExtension: fileExtension, statusRequest: true });
    }
    
};
/* *********** END - Carga y Lee un archivo de excel *********** */
/* ********** START - Carga un archivo, lo convierte a blob y luego lo almacena en el servidor ********** */
const uploadFileAndSaveBlob = async (req, res) => {
    let files = req.files;
    let savedFile = await Utils.storageBlobFile(files.file, req.user);
    if (!savedFile.statusRequest) {
        res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
    } else {
        res.status(200).send({ data: savedFile.data, statusRequest: true });
    }
};
/* *********** END - Carga un archivo, lo convierte a blob y luego lo almacena en el servidor *********** */

module.exports = {
    getNewToken,
    uploadFile,
    readExcelFile,
    uploadAndReadExcelFile,
    uploadFileAndSaveBlob,
};