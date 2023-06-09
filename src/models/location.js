// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let locationSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idCity: { type: Schema.ObjectId, ref: "city" },
    idCountry: { type: Schema.ObjectId, ref: "country" },
    latitude: Number,
    longitude: Number,
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("location", locationSchema);