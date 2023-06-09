let express = require("express");
let AddressUser = require("../controllers/addressUser");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      AddressUser:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado
 *              idAddress:
 *                  type: string
 *                  description: ID de la direccion - usuario
 *              idUser:
 *                  type: string
 *                  description: ID del usuario
 *              name:
 *                  type: string
 *                  description: Nombre de la asociacion direccion - usuario
 *              description:
 *                  type: string
 *                  description: Descripcion de la asociacion direccion - usuario
 *          required:
 *              - idStatus
 *              - idAddress
 *              - idUser
 *              - name
 *              - description
 *          example:
 *              idStatus: 6478e2982bdb19d7b7jry678h
 *              idAddress: 6478e2982bdb19d7b7jry678h
 *              idUser: 6478d2e4ea2a65bf339e75f0
 *              name: Asociacion Usuario con direccion
 *              description: Esta usuario esta asociado con la direccion ya que comparten el ID ...
 */
/**
 * @swagger
 * /api/address-user:
 *  post:
 *      summary: Crea una nueva asociasion direccion - usuario
 *      tags: [AddressUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/AddressUser'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/address-user:
 *  get:
 *      summary: Obtiene una lista con todas las asociasiones de direccion - usuario
 *      tags: [AddressUser]
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
 * /api/address-user/{id}:
 *  get:
 *      summary: Obtiene informacion de asociasion direccion - usuario por su ID
 *      tags: [AddressUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion - usuario
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
 * /api/address-user/{name}:
 *  post:
 *      summary: Obtiene una lista de asociasiones direccion - usuario por nombre
 *      tags: [AddressUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la asociacion direccion - usuario
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
 * /api/address-user/{id}:
 *  put:
 *      summary: Actualiza una direccion - usuario por su ID
 *      tags: [AddressUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/AddressUser'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion - usuario
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
 * /api/address-user/{id}:
 *  delete:
 *      summary: Elimina una direccion - usuario por su ID
 *      tags: [AddressUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la direccion - usuario
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
 * /api/address-user:
 *  delete:
 *      summary: Elimina todos las asociaciones direccion - usuario
 *      tags: [AddressUser]
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


api.post("/address-user", Auth, AddressUser.addAddressUser);
api.get("/address-user", Auth, AddressUser.listAddressUser);
api.get("/address-user/:id?", Auth, AddressUser.listAddressUserByID);
api.post("/address-user/:name?", Auth, AddressUser.listAddressUser);
api.put("/address-user/:id", Auth, AddressUser.updateAddressUser);
api.delete("/address-user/:id", Auth, AddressUser.deleteAddressUser);
api.delete("/address-user", Auth, AddressUser.deleteAllAddressUser);

module.exports = api;