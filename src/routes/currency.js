let express = require("express");
let Currency = require("../controllers/currency");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Currency:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara la moneda
 *              idCountry:
 *                  type: string
 *                  description: ID de el pais la moneda
 *              name: 
 *                  type: string
 *                  description: nombre de la moneda
 *              description:
 *                  type: string
 *                  description: Descripcion de la moneda
 *          required:
 *              - idStatus
 *              - idCountry
 *              - name:
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              idCountry: 647a73a6d47ece6731a4d979
 *              name: COP - Peso Colombiano
 *              description: Moneda oficial de la Republica de Colombia
 */
/**
 * @swagger
 * /api/currency:
 *  post:
 *      summary: Crea una nueva moneda
 *      tags: [Currency]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Currency'
 *      responses:
 *          200: 
 *            description: New location created   
 */
/**
 * @swagger
 * /api/currency:
 *  get:
 *      summary: Obtiene una lista con todas las monedas
 *      tags: [Currency]
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
 * /api/currency/{id}:
 *  get:
 *      summary: Obtiene informacion de la moneda por su ID
 *      tags: [Currency]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la moneda
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
 * /api/currency/{name}:
 *  post:
 *      summary: Obtiene una lista de monedas por nombre
 *      tags: [Currency]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la moneda
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
 * /api/currency/{id}:
 *  put:
 *      summary: Actualiza un moneda por su ID
 *      tags: [Currency]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Currency'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la moneda
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
 * /api/currency/{id}:
 *  delete:
 *      summary: Elimina una moneda por su ID
 *      tags: [Currency]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la moneda
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
 * /api/currency:
 *  delete:
 *      summary: Elimina todas las monedas
 *      tags: [Currency]
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

api.post("/currency", Auth, Currency.addCurrency);
api.get("/currency", Auth, Currency.listCurrency);
api.get("/currency/:id?", Auth, Currency.listCurrencyByID);
api.post("/currency/:name?", Auth, Currency.listCurrency);
api.put('/currency/:id', Auth, Currency.updateCurrency);
api.delete('/currency/:id', Auth, Currency.deleteCurrency);
api.delete("/currency", Auth, Currency.deleteAllCurrency);

module.exports = api;