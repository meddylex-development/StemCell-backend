// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let documentTypeSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("documentType", documentTypeSchema);