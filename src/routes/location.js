let express = require("express");
let Location = require("../controllers/location");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Location:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara la localizacion
 *              idCity:
 *                  type: string
 *                  description: ID de la ciudad la localizacion
 *              idCountry:
 *                  type: string
 *                  description: ID de el pais la localizacion
 *              latitude: 
 *                  type: string
 *                  description: latitud de la localizacion
 *              longitude: 
 *                  type: string
 *                  description: longitud de la localizacion
 *              name: 
 *                  type: string
 *                  description: nombre de la localizacion
 *              description:
 *                  type: string
 *                  description: Descripcion de la localizacion
 *          required:
 *              - idStatus
 *              - idCity
 *              - idCountry
 *              - latitude
 *              - longitude
 *              - name:
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              idCity: 647a73a6d47ece6731a4d979
 *              idCountry: 647a73a6d47ece6731a4d979
 *              latitude: 40.14528997427982
 *              longitude: -2.9582043750000366
 *              name: Cercacanias Madrid
 *              description: Es un lugar cercano a Madrid
 */
/**
 * @swagger
 * /api/location:
 *  post:
 *      summary: Crea una nueva localizacion
 *      tags: [Location]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Location'
 *      responses:
 *          200: 
 *            description: New location created   
 */
/**
 * @swagger
 * /api/location:
 *  get:
 *      summary: Obtiene una lista con todas las localizaciones
 *      tags: [Location]
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
 * /api/location/{id}:
 *  get:
 *      summary: Obtiene informacion de la localizacion por su ID
 *      tags: [Location]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la localizacion
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
 * /api/location/{name}:
 *  post:
 *      summary: Obtiene una lista de localizaciones por nombre
 *      tags: [Location]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la localizacion
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
 * /api/location/{id}:
 *  put:
 *      summary: Actualiza un localizacion por su ID
 *      tags: [Location]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Location'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la localizacion
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
 * /api/location/{id}:
 *  delete:
 *      summary: Elimina una localizacion por su ID
 *      tags: [Location]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la localizacion
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
 * /api/location:
 *  delete:
 *      summary: Elimina todos las localizaciones
 *      tags: [Location]
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

api.post("/location", Auth, Location.addLocation);
api.get("/location", Auth, Location.listLocations);
api.get("/location/:id?", Auth, Location.listLocationByID);
api.post("/location/:name?", Auth, Location.listLocations);
api.put('/location/:id', Auth, Location.updateLocation);
api.delete('/location/:id', Auth, Location.deleteLocation);
api.delete("/location", Auth, Location.deleteAllLocations);

module.exports = api;