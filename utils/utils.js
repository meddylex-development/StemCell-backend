let jwt = require("jsonwebtoken");
let moment = require("moment");
let secret = "BaseParkway-StemCell-2021*.";

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

module.exports = {
    createToken,
    verifyToken,
    getDateNowMilisec,
    getDateFormat,
};