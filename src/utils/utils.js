let jwt = require("jsonwebtoken");
let moment = require("moment");
let secret = "BaseParkway-StemCell-2021*.";
// Importamos modulo node para el control de ficheros
let fs = require("fs");
// Importamos modulo path
let path = require("path");
// Importamos modulo para usar con archivos xls
const xlsReader = require('xlsx');

const verifyToken = (payload) => {

    return new Promise((resolve, reject) => {

        if (!payload) {
            reject({ data: new Error("Not authorized"), statusRequest: false });
        } else {

            try {
                const decoded = jwt.verify(payload, secret, {
                    algorithm: 'RS256',
                    // audience: '078b1750-dd74-11e9-8a34-2a2ae2dbcce4'
                });
                console.log('decoded: ', decoded);

                let dateNow = moment().valueOf();
                console.log('dateNow ------------->>>>>> ', Utils.getDateFormat(dateNow, 'DD/MM/YYYY HH:mm'));
                let timeExpired = decoded.exp;
                console.log('timeExpired ------------->>>>>> ', Utils.getDateFormat(timeExpired, 'DD/MM/YYYY HH:mm'));
                let isExpired = timeExpired < dateNow;
                console.log('isExpired: ', isExpired);
                if (isExpired) {
                    // res.status(401).send({ data: 'Token expired', statusRequest: false });
                    reject({ data: 'Token expired', statusRequest: false });
                }
                resolve({ data: { encoded: payload, decoded: decoded }, statusRequest: true });
                
            } catch (error) {
                // console.log('error: ', error);
                reject({ data: error.message, statusRequest: false });
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
                // console.log('payload: ', payload);
                const encode = jwt.sign(payload, secret);
                resolve({ data: encode, statusRequest: true });
            } catch (error) {
                // console.log('error: ', error);
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
        let pathTemplate = path.join(__dirname, '../..', pathFile);
        fs.readFile(pathTemplate, { encoding: 'utf-8' }, function (err, dataFile) {
            if (err) {
                reject(err); 
            throw err;
            } else {
                resolve(dataFile);
            }
        });
    })
};

const readXlsFile = (pathFile, isStoreBuffer = false) => {
    return new Promise((resolve, reject) => {

        if (!pathFile) reject(new Error('No path file'));

        let data = {};
        let workbook = null;
        if (isStoreBuffer) {
            const buffer = fs.readFileSync(pathFile);
            workbook = xlsReader.read(buffer, { type: 'buffer' });
        } else {
            workbook = xlsReader.readFile(filePath);
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
        resolve(data);
    });
};



module.exports = {
    createToken,
    verifyToken,
    getDateNowMilisec,
    getDateFormat,
    uploadFile,
    readFile,
    readXlsFile,
};