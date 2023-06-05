let moment = require("moment");
let Utils = require("../utils/utils");

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

module.exports = {
    getNewToken,
};