let express = require("express");
let Country = require("../controllers/country");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Country:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara el país
 *              name: 
 *                  type: string
 *                  description: Nombre del país
 *              description:
 *                  type: string
 *                  description: Descripcion del país
 *          required:
 *              - idStatus
 *              - name
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Argentina
 *              description: Republica nacional de Argentina
 */
/**
 * @swagger
 * /api/country:
 *  post:
 *      summary: Crea un nuevo país
 *      tags: [Country]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Country'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/country:
 *  get:
 *      summary: Obtiene una lista con todos los paises
 *      tags: [Country]
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
 * /api/country/{id}:
 *  get:
 *      summary: Obtiene informacion del país por su ID
 *      tags: [Country]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del país
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
 * /api/country/{name}:
 *  post:
 *      summary: Obtiene una lista de paises por nombre
 *      tags: [Country]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del país
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
 * /api/country/{id}:
 *  put:
 *      summary: Actualiza un país por su ID
 *      tags: [Country]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Country'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del país
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
 * /api/country/{id}:
 *  delete:
 *      summary: Elimina un país por su ID
 *      tags: [Country]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del país
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
 * /api/country:
 *  delete:
 *      summary: Elimina todos los paises
 *      tags: [Country]
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


api.post("/country", Auth, Country.addCountry);
api.get("/country", Auth, Country.listCountries);
api.get("/country/:id?", Auth, Country.listCountryByID);
api.post("/country/:name?", Auth, Country.listCountries);
api.put("/country/:id", Auth, Country.updateCountry);
api.delete("/country/:id", Auth, Country.deleteCountry);
api.delete("/country", Auth, Country.deleteAllCountries);

module.exports = api;