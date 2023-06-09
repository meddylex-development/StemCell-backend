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
/* ********** START - Carga un archivo al servidor ********** */
const uploadFile = async (req, res) => {
    // console.log('res: ', res);
    // console.log('req: ', req);
    let params = req.body;
    console.log('params: ', params);
    let files = req.files;
    console.log('files: ', files);
    
    let dateNow = Utils.getDateNowMilisec();
    console.log('dateNow: ', dateNow);
    
    let imagePath = req.files.file.path;
    console.log('imagePath: ', imagePath); // Borrar despues de probar
    
    // Generamos codigo consecutivo con fecha para el nombre de las imagenes
    let fileName = dateNow;
    console.log('fileName: ', fileName);
    
    // extencion del archivo que quedara en BD
    let fileExtension = path.extname(imagePath);
    console.log('fileExtension: ', fileExtension);

    const savedFile = await Utils.storageFile(imagePath, 'assets/uploads/temp/', files.file.originalFilename);
    console.log('savedFile: ', savedFile);

    if (!savedFile.statusRequest) {
        res.status(500).send({ data: "Error al cargar la imagen", statusRequest: false });
    } else {
        // res.status(200).send({ data: savedFile.urlFile, fileName: `${ fileName }`, fileExtension: fileExtension, statusRequest: true });

        const file_ = new File({
            idStatus: "647a73a6d47ece6731a4d979",
            name: files.file.originalFilename,
            name: files.file.originalFilename,
            extension: fileExtension,
            location: savedFile.urlFile,
            size: files.file.size,
            description: "Imagen de prueba",
            dateCreated: dateNow,
            dateUpdated: dateNow,
        });
        await file_.save((err, dataResponse) => {
            if (err) {
                res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
            } else {
                if (dataResponse) {
                    res.status(200).send({ data: dataResponse, statusRequest: true });
                } else {
                    res.status(401).send({ data: "No se pudo registrar la direccion", statusRequest: false });
                }
            }
        });

    }
    
};
/* *********** END - Carga un archivo al servidor *********** */
/* ********** START - Lee un archivo de excel ********** */
const readExcelFile = async (req, res) => {
    
    let params = req.body;
    console.log('params: ', params);

    let fileName = req.body.fileName;
    console.log('fileName: ', fileName);
    let fileExtension = req.body.fileExtension;
    console.log('fileExtension: ', fileExtension);
    
    let dataFile = await Utils.readXlsFile(`assets/uploads/${ fileName }.${ fileExtension }`, false);
    // let dataFile = await Utils.readXlsFile('assets/uploads/' + fileName + '.' + fileExtension);
    console.log('dataFile: ', dataFile);
    if (!dataFile) {
        res.status(500).send({ data: "Error al leer el archivo", statusRequest: false });
    } else {
        res.status(200).send({ data: dataFile, fileName: `${ fileName }`, fileExtension: fileExtension, statusRequest: true });
    }
    
};
/* *********** END - Lee un archivo de excel *********** */
/* ********** START - Carga y Lee un archivo de excel ********** */
const uploadAndReadExcelFile = async (req, res) => {
    
    let params = req.body;
    // console.log('params: ', params);
    let files = req.files;
    // console.log('files: ', files);
    let dateNow = Utils.getDateNowMilisec();
    // console.log('dateNow: ', dateNow);

    let imagePath = req.files.file.path;
    // console.log('imagePath: ', imagePath); // Borrar despues de probar

    // Generamos codigo consecutivo con fecha para el nombre de las imagenes
    let fileName = dateNow;
    console.log('fileName: ', fileName);
    
    // extencion del archivo que quedara en BD
    let fileExtension = path.extname(imagePath);
    console.log('fileExtension: ', fileExtension);

    // Creamos variable de la nueva ruta
    // let routeServer = path.join(__dirname, '../..', 'assets/uploads/' + fileName + fileExtension);
    // console.log('routeServer: ', routeServer); // Borrar despues de probar
    
    let saveFile = await Utils.uploadFile(imagePath, 'assets/uploads/', fileName, fileExtension);
    console.log('saveFile: ', saveFile);

    if (!saveFile.statusRequest) {
        res.status(500).send({ data: "Error al cargar el archivo", statusRequest: false });
    } else {
        // let pathFile = saveFile.urlFile; 
        // console.log('pathFile: ', pathFile);

        // let dataFile = await Utils.readXlsFile(`assets/uploads/${ fileName }${ fileExtension }`);
        let dataFile = await Utils.readXlsFile(imagePath, true);
        // let dataFile = await Utils.readXlsFile('assets/uploads/' + fileName + fileExtension);
        console.log('dataFile: ', dataFile);
        if (!dataFile) {
            res.status(500).send({ data: "Error al leer el archivo", statusRequest: false });
        } else {
            res.status(200).send({ data: dataFile, fileName: `${ fileName }`, fileExtension: fileExtension, statusRequest: true });
        }

    }
    
};
/* *********** END - Lee un archivo de excel *********** */
/* ********** START - Carga un archivo, lo convierte a blob y luego lo almacena en el servidor ********** */
const uploadFileAndSaveBlob = async (req, res) => {
    let files = req.files;
    console.log('files: ', files);
    
    let dateNow = Utils.getDateNowMilisec();
    console.log('dateNow: ', dateNow);
    
    let imagePath = req.files.file.path;
    console.log('imagePath: ', imagePath); // Borrar despues de probar

    let fileExtension = path.extname(imagePath);
    console.log('fileExtension: ', fileExtension);

    const uuidNameFile = Utils.getUUID();
    console.log('uuidNameFile: ', uuidNameFile);
    // const blobPath = `../../assets/uploads/blob/${uuidNameFile}.blob`; // Ruta de almacenamiento en el servidor
    
    let blobPath = path.join(__dirname, '../..', 'assets/uploads/blob/' + uuidNameFile + '.blob');
    console.log('blobPath: ', blobPath);
    

    fs.rename(imagePath, blobPath, async (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al cargar el archivo' });
        } else {

            const file_ = new File({
                idStatus: "647a73a6d47ece6731a4d979",
                name: uuidNameFile,
                originalName: files.file.originalFilename,
                extension: fileExtension,
                location: blobPath,
                size: files.file.size,
                description: "Archivo blob " + uuidNameFile,
                dateCreated: dateNow,
                dateUpdated: dateNow,
            });
            await file_.save((err, dataResponse) => {
                if (err) {
                    res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
                } else {
                    if (dataResponse) {
                        res.status(200).send({ data: dataResponse, statusRequest: true });
                    } else {
                        res.status(401).send({ data: "No se pudo registrar la direccion", statusRequest: false });
                    }
                }
            });


            // res.json({ message: 'Archivo cargado correctamente', fileId });
        }
    });

};
/* *********** END - Carga un archivo, lo convierte a blob y luego lo almacena en el servidor *********** */

module.exports = {
    getNewToken,
    uploadFile,
    readExcelFile,
    uploadAndReadExcelFile,
    uploadFileAndSaveBlob,
};