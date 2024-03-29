// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let currencySchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idCountry: { type: Schema.ObjectId, ref: "country" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("currency", currencySchema);