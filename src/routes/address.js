let express = require("express");
let Address = require("../controllers/address");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Address:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara la direccion
 *              idCountry:
 *                  type: string
 *                  description: ID del pais de la direccion
 *              idCity:
 *                  type: string
 *                  description: ID de la ciudad la direccion
 *              name: 
 *                  type: string
 *                  description: nombre de la direccion
 *              description:
 *                  type: string
 *                  description: Descripcion de la direccion
 *          required:
 *              - idStatus
 *              - idCountry
 *              - idCity
 *              - name
 *              - name:
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              idCountry: 7456j456h456i4k57456p64k5
 *              idCity: i543i4034y34r34e3t454y35
 *              name: Direccion de usuario
 *              description: Es la direccion de usuario que el registro en el formulario de registro
 */
/**
 * @swagger
 * /api/address:
 *  post:
 *      summary: Crea una nueva direccion
 *      tags: [Address]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Address'
 *      responses:
 *          200: 
 *            description: New address created   
 */
/**
 * @swagger
 * /api/address:
 *  get:
 *      summary: Obtiene una lista con todas las direcciones
 *      tags: [Address]
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
 * /api/address/{id}:
 *  get:
 *      summary: Obtiene informacion de una direccion por su ID
 *      tags: [Address]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion
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
 * /api/address/{name}:
 *  post:
 *      summary: Obtiene una lista de direcciones por nombre
 *      tags: [Address]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la direccion
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
 * /api/address/{id}:
 *  put:
 *      summary: Actualiza una direccion por su ID
 *      tags: [Address]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Address'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion
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
 * /api/address/{id}:
 *  delete:
 *      summary: Elimina una direccion por su ID
 *      tags: [Address]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion
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
 * /api/address:
 *  delete:
 *      summary: Elimina todas las direcciones
 *      tags: [Address]
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

api.post("/address", Auth, Address.addAddress);
api.get("/address", Auth, Address.listAddress);
api.get("/address/:id?", Auth, Address.listAddressByID);
api.post("/address/:name?", Auth, Address.listAddress);
api.put('/address/:id', Auth, Address.updateAddress);
api.delete('/address/:id', Auth, Address.deleteAddress);
api.delete("/address", Auth, Address.deleteAllAddress);

module.exports = api;