// Variable Mongoose
let mongoose = require("mongoose");
// metodo que permite crear esquemas desde node/express
let Schema = mongoose.Schema;

let userSchema = Schema({
    idStatus: { type: Schema.ObjectId, ref: "status" },
    idProfile: { type: Schema.ObjectId, ref: "profile" },
    idDocumentType: { type: Schema.ObjectId, ref: "documentType" },
    idCountry: { type: Schema.ObjectId, ref: "country" },
    idCity: { type: Schema.ObjectId, ref: "city" },
    idLanguage: { type: Schema.ObjectId, ref: "language" },
    idFile: { type: Schema.ObjectId, ref: "file" },
    idAddress: { type: Schema.ObjectId, ref: "address" },
    verifiedAccount: Boolean,
    sessionStatus: Boolean,
    firstName: String,
    secondFirstName: String,
    lastName: String,
    secondLastName: String,
    documentNumber: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: String,
    birthDate: Number,
    dateCreated: Number,
    dateUpdated: Number,
});

module.exports = mongoose.model("user", userSchema);