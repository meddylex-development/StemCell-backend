// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let fileUserSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idFile: { type: Schema.ObjectId, ref: "file" },
    idUser: { type: Schema.ObjectId, ref: "user" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("fileUser", fileUserSchema);