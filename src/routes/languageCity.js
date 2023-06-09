let express = require("express");
let LanguageCity = require("../controllers/languageCity");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      LanguageCity:
 *          type: Object
 *          properties: 
 *              idLanguage:
 *                  type: string
 *                  description: ID del lenguaje
 *              idStatus:
 *                  type: string
 *                  description: ID del estado
 *              idCity:
 *                  type: string
 *                  description: ID de la ciudad
 *              idCountry:
 *                  type: string
 *                  description: ID del pais
 *              description:
 *                  type: string
 *                  description: Descripcion de la asociacion lenguaje - pais
 *          required:
 *              - idLanguage
 *              - idStatus
 *              - idCity
 *              - idCountry
 *              - description
 *          example:
 *              idLanguage: 6478e2982bdb19d7b7jry678h
 *              idStatus: 6478e2982bdb19d7b7jry678h
 *              idCity: 6478d2e4ea2a65bf339e75f0
 *              idCountry: 6478e2982bdb19d7626a5f5d
 *              description: Lenguaje para la ciudad xxxxx
 */
/**
 * @swagger
 * /api/language-city:
 *  post:
 *      summary: Crea una nueva asociasion lenguaje - ciudad
 *      tags: [LanguageCity]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/LanguageCity'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/language-city:
 *  get:
 *      summary: Obtiene una lista con todas las asociasiones de lenguaje - ciudad
 *      tags: [LanguageCity]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */
/**
 * @swagger
 * /api/language-city/{id}:
 *  get:
 *      summary: Obtiene informacion de asociasion lenguaje - ciudad por su ID
 *      tags: [LanguageCity]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del lenguaje - ciudad
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */
/**
 * @swagger
 * /api/language-city/{description}:
 *  post:
 *      summary: Obtiene una lista de asociasiones lenguaje - ciudad por descripcion
 *      tags: [LanguageCity]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: description
 *            description: Descripcion de la asociacion lenguaje - ciudad
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */
/**
 * @swagger
 * /api/language-city/{id}:
 *  put:
 *      summary: Actualiza un lenguaje - ciudad por su ID
 *      tags: [LanguageCity]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/LanguageCity'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del lenguaje - ciudad
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */
/**
 * @swagger
 * /api/language-city/{id}:
 *  delete:
 *      summary: Elimina un lenguaje - ciudad por su ID
 *      tags: [LanguageCity]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del lenguaje - ciudad
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */
/**
 * @swagger
 * /api/language-city:
 *  delete:
 *      summary: Elimina todos los lenguajes - ciudad
 *      tags: [LanguageCity]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          -application/json
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                      example:
 *                       "message": "Hello there"  
 */


api.post("/language-city", Auth, LanguageCity.addLanguageCity);
api.get("/language-city", Auth, LanguageCity.listLanguageCity);
api.get("/language-city/:id?", Auth, LanguageCity.listLanguageCityByID);
api.post("/language-city/:description?", Auth, LanguageCity.listLanguageCity);
api.put("/language-city/:id", Auth, LanguageCity.updateLanguageCity);
api.delete("/language-city/:id", Auth, LanguageCity.deleteLanguageCity);
api.delete("/language-city", Auth, LanguageCity.deleteAllLanguagesCity);

module.exports = api;