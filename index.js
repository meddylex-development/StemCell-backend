let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let path = require("path");

let port = process.env.PORT || 3001;

let app = express();

let Status = require("./src/routes/status");
let Profile = require("./src/routes/profile");
let DocumentType = require("./src/routes/documentType");
let Menu = require("./src/routes/menu");
let MenuProfile = require("./src/routes/menuProfile");
let Country = require("./src/routes/country");
let City = require("./src/routes/city");
let Language = require("./src/routes/language");
let LanguageCity = require("./src/routes/languageCity");
let Location = require("./src/routes/location");
let LocationUser = require("./src/routes/locationUser");
let File = require("./src/routes/file");
let FileUser = require("./src/routes/fileUser");
let Address = require("./src/routes/address");
let AddressUser = require("./src/routes/addressUser");
let Currency = require("./src/routes/currency");
let User = require("./src/routes/user");
let Auth = require("./src/routes/auth");
let AuditTrack = require("./src/routes/auditTrack");

let Develop = require("./src/routes/develop");

// Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.0.3", // present supported openapi version
    info: {
      version: "1.0.0", // version number
      title: "Celula madre backend API", // short title.
      description: "Esta es una descripcion de la API", //  desc.
      summary: "Este es un resumen de la API",
      // contact: {
      //   name: "John doe", // your name
      //   email: "john@web.com", // your email
      //   url: "web.com", // your website
      // },
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        "url": "http://localhost:3001",
        "description": "Development server"
      },
      // {
      //   "url": "http://localhost:9000",
      //   "description": "Staging server"
      // },
      // {
      //   "url": "http://localhost:9000",
      //   "description": "Production server"
      // }
    ]
  },
  apis: [`${ path.join(__dirname, "./src/routes/*.js") }`]
};

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
app.use("/api", Language);
app.use("/api", LanguageCity);
app.use("/api", Location);
app.use("/api", LocationUser);
app.use("/api", File);
app.use("/api", FileUser);
app.use("/api", Address);
app.use("/api", AddressUser);
app.use("/api", Currency);
app.use("/api", User);
app.use("/api", Auth);
app.use("/api", AuditTrack);
app.use("/api", Develop);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

module.exports = app;