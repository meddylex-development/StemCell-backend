let express = require("express");
let FileUser = require("../controllers/fileUser");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      FileUser:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado
 *              idFile:
 *                  type: string
 *                  description: ID del archivo - usuario
 *              idUser:
 *                  type: string
 *                  description: ID del usuario
 *              name:
 *                  type: string
 *                  description: Nombre de la asociacion archivo - usuario
 *              description:
 *                  type: string
 *                  description: Descripcion de la asociacion archivo - usuario
 *          required:
 *              - idStatus
 *              - idFile
 *              - idUser
 *              - name
 *              - description
 *          example:
 *              idStatus: 6478e2982bdb19d7b7jry678h
 *              idFile: 6478e2982bdb19d7b7jry678h
 *              idUser: 6478d2e4ea2a65bf339e75f0
 *              name: Asociacion Usuario con archivo
 *              description: Esta usuario esta asociado con ya que comparten el ID ...
 */
/**
 * @swagger
 * /api/file-user:
 *  post:
 *      summary: Crea una nueva asociasion archivo - usuario
 *      tags: [FileUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/FileUser'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/file-user:
 *  get:
 *      summary: Obtiene una lista con todas las asociasiones de archivo - usuario
 *      tags: [FileUser]
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
 * /api/file-user/{id}:
 *  get:
 *      summary: Obtiene informacion de asociasion archivo - usuario por su ID
 *      tags: [FileUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo - usuario
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
 * /api/file-user/{name}:
 *  post:
 *      summary: Obtiene una lista de asociasiones archivo - usuario por nombre
 *      tags: [FileUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre de la asociacion archivo - usuario
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
 * /api/file-user/{id}:
 *  put:
 *      summary: Actualiza un archivo - usuario por su ID
 *      tags: [FileUser]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/FileUser'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo - usuario
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
 * /api/file-user/{id}:
 *  delete:
 *      summary: Elimina un archivo - usuario por su ID
 *      tags: [FileUser]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo - usuario
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
 * /api/file-user:
 *  delete:
 *      summary: Elimina todos los archivo - usuario
 *      tags: [FileUser]
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


api.post("/file-user", Auth, FileUser.addFileUser);
api.get("/file-user", Auth, FileUser.listFileUser);
api.get("/file-user/:id?", Auth, FileUser.listFileUserByID);
api.post("/file-user/:name?", Auth, FileUser.listFileUser);
api.put("/file-user/:id", Auth, FileUser.updateFileUser);
api.delete("/file-user/:id", Auth, FileUser.deleteFileUser);
api.delete("/file-user", Auth, FileUser.deleteAllFilesUser);

module.exports = api;