// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let addressUserSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idAddress: { type: Schema.ObjectId, ref: "address" },
    idUser: { type: Schema.ObjectId, ref: "user" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("addressUser", addressUserSchema);