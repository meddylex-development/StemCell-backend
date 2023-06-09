// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let locationUserSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idLocation: { type: Schema.ObjectId, ref: "language" },
    idUser: { type: Schema.ObjectId, ref: "user" },
    name: String,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("locationUser", locationUserSchema);