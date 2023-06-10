const _ = require('lodash');
const jwt = require('jsonwebtoken');
let moment = require("moment");

let Utils = require("../utils/utils");

const secret = "BaseParkway-StemCell-2021*.";
// const publicKey = fs.readFileSync('../rsa-sha256/jwtRS256.key.pub');


module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    // console.log('authHeader: ', authHeader);
    if (!authHeader) return res.status(401).send('Not authorized');

    const token = _.replace(authHeader, 'Bearer', '').trim();
    // console.log('token: ', token);
    if (!token) return res.status(401).send('Not authorized');

    try {
        const decoded = jwt.verify(token, secret, {
            algorithm: 'RS256',
            // audience: '078b1750-dd74-11e9-8a34-2a2ae2dbcce4'
        });
        
        console.log('decoded ------------->>>>>> ', decoded);
        let dateNow = moment().valueOf();
        console.log('dateNow ------------->>>>>> ', Utils.getDateFormat(dateNow, 'DD/MM/YYYY HH:mm'));
        let timeExpired = decoded.exp;
        console.log('dateTokenExpired ------------->>>>>> ', Utils.getDateFormat(timeExpired, 'DD/MM/YYYY HH:mm'));
        let isExpired = timeExpired < dateNow;
        console.log('isTokenExpired: ', isExpired);
        if (isExpired) {
            res.status(401).send({ data: 'Token expired', statusRequest: false });
        }
        let isVerifiedAccount = decoded.verifiedAccount;
        console.log('isVerifiedAccount: ', isVerifiedAccount);
        if (!isVerifiedAccount) {
            res.status(401).send({ data: "This account isn't verified!", statusRequest: false });
        }
        req.user = decoded;
        req.payload = token;
        next();
    } catch (error) {
        return res.status(401).send({ data: 'Not authorized', statusRequest: false });
    }
};