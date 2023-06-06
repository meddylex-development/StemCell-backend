let express = require("express");
let City = require("../controllers/city");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      City:
 *          type: Object
 *          properties: 
 *              idStatus: 
 *                  type: string
 *                  description: ID del estado en el cual quedara la ciudad
 *              idCountry: 
 *                  type: string
 *                  description: ID del país al cual hace parte la ciudad
 *              name: 
 *                  type: string
 *                  description: Nombre la ciudad
 *              description:
 *                  type: string
 *                  description: Descripcion de la ciudad
 *          required:
 *              - name
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              idCountry: 647a5cf4ea1a4f632b3ef2c6
 *              name: Cali
 *              description: Ciudad metropolitana de Cali
 */
/**
 * @swagger
 * /api/city:
 *  post:
 *      summary: Crea una nueva ciudad
 *      tags: [City]
 *      description: "Esta API crea un nuevo estado en la base de datos y retorna un objeto json con el estado de la peticion"
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/City'
 *      responses:
 *          200: 
 *            description: New city created   
 */
/**
 * @swagger
 * /api/city:
 *  get:
 *      summary: Obtiene una lista con todas las ciudades
 *      tags: [City]
 *      description: "Esta API retorna una lista de todos los estados existentes en la base de datos"
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
 * /api/city/{id}:
 *  get:
 *      summary: Obtiene informacion de una ciudad por su ID
 *      tags: [City]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la ciudad
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
 * /api/city/{name}:
 *  post:
 *      summary: Obtiene una lista de ciudades por nombre
 *      tags: [City]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del la ciudad
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
 * /api/city/{id}:
 *  put:
 *      summary: Actualiza una ciudad por su ID
 *      tags: [City]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/City'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la ciudad
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
 * /api/city/{id}:
 *  delete:
 *      summary: Elimina una ciudad por su ID
 *      tags: [City]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID de la ciudad
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
 * /api/city:
 *  delete:
 *      summary: Elimina todas las ciudades
 *      tags: [City]
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

api.post("/city", Auth, City.addCity);
api.get("/city", Auth, City.listCities);
api.get("/city/:id?", Auth, City.listCityByID);
api.post("/city/:name?", Auth, City.listCities);
api.put("/city/:id", Auth, City.updateCity);
api.delete("/city/:id", Auth, City.deleteCity);
api.delete("/city", Auth, City.deleteAllCities);

module.exports = api;