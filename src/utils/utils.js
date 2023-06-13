let jwt = require("jsonwebtoken");
let moment = require("moment");
let fs = require("fs");
let path = require("path");
const xlsReader = require('xlsx');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
let handlebars = require('handlebars');

let secret = "BaseParkway-StemCell-2021*.";

let File = require("../models/file");
let FileUser = require("../models/fileUser");


const verifyToken = (payload) => {

    return new Promise((resolve, reject) => {

        if (!payload) {
            resolve({ data: "No tiene acceso!", statusRequest: false });
        } else {

            try {
                const decoded = jwt.verify(payload, secret, {
                    algorithm: 'RS256',
                    // audience: '078b1750-dd74-11e9-8a34-2a2ae2dbcce4'
                });

                let dateNow = moment().valueOf();
                let timeExpired = decoded.exp;
                let isExpired = timeExpired < dateNow;
                if (isExpired) {
                    // res.status(401).send({ data: 'Token expired', statusRequest: false });
                    resolve({ data: "Token ha expirado!", statusRequest: false });
                } else {
                    resolve({ data: { encoded: payload, decoded: decoded }, statusRequest: true });
                }
                
            } catch (error) {
                resolve({ data: "Token no valido!", statusRequest: false });
            }

        }
    });

};

const createToken = (dataToken, timeExpired = null, typeTime = null, numberTime = null) => {
    return new Promise((resolve, reject) => {
        if (!dataToken) {
            reject({ data: new Error("Invalid dataToken"), statusRequest: false });
        } else {
            try {
                let valTime = (typeTime) ? typeTime : "days";
                let quantityTime = (numberTime) ? numberTime : 1;
                let dateExpired = (timeExpired) ? timeExpired : moment().add(quantityTime, valTime).valueOf();
                let payload = {
                    ...dataToken,
                    iat: getDateNowMilisec(),
                    exp: dateExpired,
                };
                const encode = jwt.sign(payload, secret);
                resolve({ data: encode, statusRequest: true });
            } catch (error) {
                resolve({ data: error.message, statusRequest: false });
            }

        }
    });
};

const getDateNowMilisec = () => {
    return moment().valueOf();
}

const getDateFormat = (timestamp = '', format = '') => {
    // 'DD/MM/YYYY'
    // 'DD/MM/YYYY HH:mm'
    let formatDate = (format) ? format : 'DD/MM/YYYY';
    return moment(timestamp).format(formatDate);
}

const getUUID = () => {
    let UUID = crypto.randomUUID();
    return UUID;
}

const uploadFile = (temporalPath, pathServer, fileName, fileExtension) => {
    return new Promise((resolve, reject) => {
        if (!pathServer) {
            reject({ data: new Error("No se definio la ruta del archivo"), statusRequest: false });
        } else {
            let imagePath = temporalPath;
            let routeServer = path.join(__dirname, '../..', pathServer + fileName + fileExtension);
            fs.createReadStream(imagePath).pipe(fs.createWriteStream(routeServer));
            resolve({ urlFile: routeServer, statusRequest: true });
        }
    });
}

const readFile = (pathFile) => {
    return new Promise((resolve, reject) => {
        if (!pathFile) reject(new Error('No path file'));  
        
        // Comprobamos que el archivo exista
        fs.access(pathFile, fs.constants.F_OK, (error) => {
            if (error) {
              resolve({ data: error, statusRequest: false });
            } else {
                
                let pathTemplate = path.join(__dirname, '../..', pathFile);
                fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, dataFile) {
                    if (err) {
                        reject({ data: err, statusRequest: false }); 
                    throw err;
                    } else {
                        resolve({ data: dataFile, statusRequest: true });
                    }
                });
            }
        });

    })
};

const readXlsFile = (pathFile, isStoreBuffer = false) => {
    return new Promise((resolve, reject) => {

        if (!pathFile) reject(new Error('No path file'));

        // Comprobamos que el archivo exista
        fs.access(pathFile, fs.constants.F_OK, (error) => {
            if (error) {
              resolve({ data: error, statusRequest: false })
            } else {
              
                let data = {};
                let workbook = null;
                if (isStoreBuffer) {
                    const buffer = fs.readFileSync(pathFile);
                    workbook = xlsReader.read(buffer, { type: 'buffer' });
                } else {
                    workbook = xlsReader.readFile(pathFile);
                }

                if (!workbook) reject(new Error('Error reading file!'));

                const sheets = workbook.SheetNames;
                for(let i = 0; i < sheets.length; i++) {
                    
                    let fileSheetNames = workbook.SheetNames[i];
                    let dataSheet = data[fileSheetNames] = [];
                    const temp = xlsReader.utils.sheet_to_json(workbook.Sheets[fileSheetNames]);
                    temp.forEach((res) => {
                        dataSheet.push(res);
                    });
                }
                resolve({ data: data, statusRequest: true });
                
            }
        });


        
    });
};

const storageFile = (objFile = null, user = null) => {
    return new Promise((resolve, reject) => {
        if (!objFile || !user) {
            reject({ data: new Error("No se definio la ruta del archivo"), statusRequest: false });
        } else {

            const dateNow = getDateNowMilisec();

            const uuidNameFile = getUUID();
            let originalFileName = objFile.originalFilename;
            let sizeFile = objFile.size;
            let tempFilePath = objFile.path;
            let fileExtension = path.extname(tempFilePath);
            let filePath = path.join(__dirname, '../..', 'assets/uploads/temp/' + originalFileName);

            fs.rename(tempFilePath, filePath, async (errorSaved) => {
                // fs.createReadStream(tempFilePath).pipe(fs.createWriteStream(filePath, async (errorSaved) => {
                if (errorSaved) {
                    reject({ data: "Error al tratar de almacenar el archivo", statusRequest: false });
                    // res.status(500).json({ error: 'Error al cargar el archivo' });
                } else {

                    const file_ = new File({
                        idStatus: user.idStatus,
                        name: originalFileName,
                        originalName: originalFileName,
                        extension: fileExtension,
                        location: filePath,
                        size: sizeFile,
                        description: "Archivo ",
                        dateCreated: dateNow,
                        dateUpdated: dateNow,
                    });
                    await file_.save((err, dataResponse) => {
                        if (err) {
                            reject({ data: "Error al conectar al servidor", statusRequest: false });
                            // res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
                        } else {
                            if (dataResponse) {

                                const fileUser_ = new FileUser({
                                    idStatus: dataResponse.idStatus,
                                    idFile: dataResponse._id,
                                    idUser: user._id,
                                    name: "Carga archivo",
                                    description: "Carga archivo",
                                    dateCreated: dateNow,
                                    dateUpdated: dateNow,
                                });
                                fileUser_.save((error, dataRes) => {
                                    if (error) {
                                        reject({ data: "Error al conectar al servidor", statusRequest: false });
                                        // res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
                                    } else {
                                        resolve({ data: dataResponse, statusRequest: true });
                                    }
                                });
                            } else {
                                // res.status(401).send({ data: "No se pudo registrar la direccion", statusRequest: false });
                                reject({ data: "Error al conectar al servidor", statusRequest: false });
                            }
                        }
                    });
                }
            });
        }
    });
};

const storageBlobFile = (objFile = null, user = null) => {
    return new Promise((resolve, reject) => {
        if (!objFile || !user) {
            reject({ data: new Error("No se definio la ruta del archivo"), statusRequest: false });
        } else {

            const dateNow = getDateNowMilisec();

            const uuidNameFile = getUUID();
            let originalFileName = objFile.originalFilename;
            let sizeFile = objFile.size;
            let tempFilePath = objFile.path;
            let fileExtension = path.extname(tempFilePath);
            let blobPath = path.join(__dirname, '../..', 'assets/uploads/blob/' + uuidNameFile + '.blob');
            
            fs.rename(tempFilePath, blobPath, async (errorSaved) => {
                if (errorSaved) {
                    reject({ data: "Error al tratar de almacenar el archivo", statusRequest: false });
                    // res.status(500).json({ error: 'Error al cargar el archivo' });
                } else {

                    const file_ = new File({
                        idStatus: "647a73a6d47ece6731a4d979",
                        name: uuidNameFile,
                        originalName: originalFileName,
                        extension: fileExtension,
                        location: blobPath,
                        size: sizeFile,
                        description: "Archivo blob " + uuidNameFile,
                        dateCreated: dateNow,
                        dateUpdated: dateNow,
                    });
                    await file_.save((err, dataResponse) => {
                        if (err) {
                            reject({ data: "Error al conectar al servidor", statusRequest: false });
                            // res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
                        } else {
                            if (dataResponse) {

                                const fileUser_ = new FileUser({
                                    idStatus: dataResponse.idStatus,
                                    idFile: dataResponse._id,
                                    idUser: user._id,
                                    name: "Carga archivo blob - " + uuidNameFile,
                                    description: "Carga archivo blob - " + uuidNameFile,
                                    dateCreated: dateNow,
                                    dateUpdated: dateNow,
                                });
                                fileUser_.save((error, dataRes) => {
                                    if (error) {
                                        reject({ data: "Error al conectar al servidor", statusRequest: false });
                                        // res.status(500).send({ data: "Error al conectar al servidor", statusRequest: false });
                                    } else {
                                        resolve({ data: dataResponse, statusRequest: true });
                                    }
                                });
                            } else {
                                // res.status(401).send({ data: "No se pudo registrar la direccion", statusRequest: false });
                                reject({ data: "Error al conectar al servidor", statusRequest: false });
                            }
                        }
                    });
                }
            });
        }
    });
};

const getFileStorage = (filename) => {
    const filePath = path.join(__dirname, '../../assets/uploads/blob/', filename);
    return fs.createReadStream(filePath);
};

const fileToBlob = (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          reject(error);
        } else {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          resolve(blob);
        }
      });
    });
};

const sendMail = (dataUser = null, stringHTML = null, replacementsHTML = null, textBodyEmail = null, filesToSend = null, imgsMail = null) => {
    return new Promise((resolve, reject) => {

        if (!dataUser) reject(new Error('Data user empty!')); 

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465, 
            secure: true,
            // service: 'gmail',
            auth: {
              user: 'meddylex.development@gmail.com',
              pass: 'zsgocqxwpexjdyuj'
            }
        });
        const mailOptions = {
            from: 'Baseparkway <meddylex.development@gmail.com>',
            to: dataUser.email,
            subject: dataUser.subject,
        };
        if (stringHTML) {
            let template = handlebars.compile(stringHTML);
            let replacements = replacementsHTML;
            let htmlToSend = template(replacements);
            mailOptions['html'] = htmlToSend;
            mailOptions['text'] = '';
        }

        if (textBodyEmail) {
            mailOptions['text'] = textBodyEmail;
            mailOptions['html'] = '';
        }

        if(filesToSend) {
            mailOptions['attachments'] = filesToSend;
        }

        if (imgsMail) {
            mailOptions['attachments'] = [
                {
                    filename: 'img1.jpg',
                    path: '../templates/images/img1.jpg',
                    cid: 'unique@german.test' //same cid value as in the html img src
                }
            ];
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                resolve({ data: error, statusRequest: false });
            } else {
                // console.log('Correo enviado: ' + info.response);
                resolve({ data: info, statusRequest: true });
            }
        });
    });
};

module.exports = {
    createToken,
    verifyToken,
    getDateNowMilisec,
    getDateFormat,
    getUUID,
    uploadFile,
    readFile,
    readXlsFile,
    storageFile,
    getFileStorage,
    fileToBlob,
    storageBlobFile,
    sendMail
};