let express = require("express");
let Language = require("../controllers/language");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Language:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara el lenguaje
 *              name: 
 *                  type: string
 *                  description: Nombre del lenguaje
 *              description:
 *                  type: string
 *                  description: Descripcion del lenguaje
 *          required:
 *              - idStatus
 *              - name
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Español
 *              description: Idioma Español
 */
/**
 * @swagger
 * /api/language:
 *  post:
 *      summary: Crea un nuevo lenguaje
 *      tags: [Language]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Language'
 *      responses:
 *          200: 
 *            description: New language created   
 */
/**
 * @swagger
 * /api/language:
 *  get:
 *      summary: Obtiene una lista con todos los lenguajes
 *      tags: [Language]
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
 * /api/language/{id}:
 *  get:
 *      summary: Obtiene informacion del lenguaje por su ID
 *      tags: [Language]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del lenguaje
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
 * /api/language/{name}:
 *  post:
 *      summary: Obtiene una lista de lenguajes por nombre
 *      tags: [Language]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del lenguaje
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
 * /api/language/{id}:
 *  put:
 *      summary: Actualiza un lenguaje por su ID
 *      tags: [Language]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Language'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Nombre del lenguaje
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
 * /api/language/{id}:
 *  delete:
 *      summary: Elimina un lenguaje por su ID
 *      tags: [Language]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del lenguaje
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
 * /api/language:
 *  delete:
 *      summary: Elimina todos los lenguajes
 *      tags: [Language]
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

api.post("/language", Auth, Language.addLanguage);
api.get("/language", Auth, Language.listLanguages);
api.get("/language/:id?", Auth, Language.listLanguageByID);
api.post("/language/:name?", Auth, Language.listLanguages);
api.put('/language/:id', Auth, Language.updateLanguage);
api.delete('/language/:id', Auth, Language.deleteLanguage);
api.delete("/language", Auth, Language.deleteAllLanguages);

module.exports = api;