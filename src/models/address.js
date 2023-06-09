// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let addressSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idCountry: { type: Schema.ObjectId, ref: "country" },
    idCity: { type: Schema.ObjectId, ref: "city" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("address", addressSchema);