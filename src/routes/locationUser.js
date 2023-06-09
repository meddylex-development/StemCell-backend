let express = require("express");
let LocationUser = require("../controllers/locationUser");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      LocationUser:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado
 *              idLocation:
 *                  type: string
 *                  description: ID de la localizacion
 *              idUser:
 *                  type: string
 *                  description: ID del usuario
 *              name:
 *                  type: string
 *                  description: Nombre de la localizacion de usuario
 *              description:
 *                  type: string
 *                  description: Descripcion de la asociacion localizacion - usuario
 *          required:
 *              - idLocation
 *              - idStatus
 *              - idUser
 *              - name
 *              - description
 *          example:
 *              idLocation: 6478e2982bdb19d7b7jry678h
 *              idStatus: 6478e2982bdb19d7b7jry678h
 *              idUser: 6478d2e4ea2a65bf339e75f0
 *              name: Asociacion Usuario con Bogota
 *              description: Estae usuario esta asociado con Bogota ya que ...
 */
/**
 * @swagger
 * /api/location-user:
 *  post:
 *      summary: Crea una nueva asociasion localizacion - usuario
 *      tags: [LocationUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/LocationUser'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/location-user:
 *  get:
 *      summary: Obtiene una lista con todas las asociasiones de localizacion - usuario
 *      tags: [LocationUser]
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
 * /api/location-user/{id}:
 *  get:
 *      summary: Obtiene informacion de asociasion localizacion - usuario por su ID
 *      tags: [LocationUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del localizacion - usuario
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
 * /api/location-user/{name}:
 *  post:
 *      summary: Obtiene una lista de asociasiones localizacion - usuario por nombre
 *      tags: [LocationUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la asociacion localizacion - usuario
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
 * /api/location-user/{id}:
 *  put:
 *      summary: Actualiza un localizacion - usuario por su ID
 *      tags: [LocationUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/LocationUser'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del localizacion - usuario
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
 * /api/location-user/{id}:
 *  delete:
 *      summary: Elimina un localizacion - usuario por su ID
 *      tags: [LocationUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del localizacion - usuario
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
 * /api/location-user:
 *  delete:
 *      summary: Elimina todos los localizacion - usuario
 *      tags: [LocationUser]
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


api.post("/location-user", Auth, LocationUser.addLocationUser);
api.get("/location-user", Auth, LocationUser.listLocationUser);
api.get("/location-user/:id?", Auth, LocationUser.listLocationUserByID);
api.post("/location-user/:name?", Auth, LocationUser.listLocationUser);
api.put("/location-user/:id", Auth, LocationUser.updateLocationUser);
api.delete("/location-user/:id", Auth, LocationUser.deleteLocationUser);
api.delete("/location-user", Auth, LocationUser.deleteAllLocationsUser);

module.exports = api;