// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let menuSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    name: String,
    title: String,
    icon: String,
    link: String,
    home: Boolean,
    description: String,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("menu", menuSchema);