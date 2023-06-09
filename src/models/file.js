// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let fileSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    name: String,
    originalName: String,
    extension: String,
    location: String,
    size: Number,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("file", fileSchema);