// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let languageCitySchema = Schema({
    idLanguage: { type: Schema.ObjectId, ref: "language" },
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idCity: { type: Schema.ObjectId, ref: "city" },
    idCountry: { type: Schema.ObjectId, ref: "country" },
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("languageCity", languageCitySchema);