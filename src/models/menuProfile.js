// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let menuProfileSchema = Schema({
    idProfile: { type: Schema.ObjectId, ref: "profile" },
    idMenu: { type: Schema.ObjectId, ref: "menu" },
    idStatus: { type: Schema.ObjectId, ref: "status" },
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("menuProfile", menuProfileSchema);