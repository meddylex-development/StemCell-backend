let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let port = process.env.PORT || 3001;

let app = express();

let Status = require("./src/routes/status");
let Profile = require("./src/routes/profile");
let DocumentType = require("./src/routes/documentType");
let Menu = require("./src/routes/menu");
let MenuProfile = require("./src/routes/menuProfile");
let Country = require("./src/routes/country");
let City = require("./src/routes/city");
let User = require("./src/routes/user");
let AuditTrack = require("./src/routes/auditTrack");

let Develop = require("./src/routes/develop");

app.listen(port, () => {
  console.log("Servidor Backend funcionando en el puerto :", port);
});

mongoose.connect("mongodb://localhost:27017/stemcelldb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => {
  console.log("Conexion con MongoDB: ON");
})
.catch((err) => {
  console.log("Conexion con MongoDB: OFF");
});

// Analizar la codificacion de las url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", Status);
app.use("/api", Profile);
app.use("/api", DocumentType);
app.use("/api", Menu);
app.use("/api", MenuProfile);
app.use("/api", Country);
app.use("/api", City);
app.use("/api", User);
app.use("/api", AuditTrack);

app.use("/api", Develop);

module.exports = app;