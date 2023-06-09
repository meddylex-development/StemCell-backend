let express = require("express");
let File = require("../controllers/file");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      File:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara la el archivo
 *              name: 
 *                  type: string
 *                  description: nombre del archivo
 *              extension: 
 *                  type: string
 *                  description: extension del archivo
 *              location: 
 *                  type: string
 *                  description: path o url de la ubicacion del archivo
 *              size: 
 *                  type: string
 *                  description: tamaño del archivo
 *              description:
 *                  type: string
 *                  description: Descripcion del archivo
 *          required:
 *              - idStatus
 *              - name
 *              - extension
 *              - location
 *              - size
 *              - name:
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Foto de perfil
 *              extension: jpg
 *              location: "../../assets/files/uploads"
 *              size: 12.345
 *              description: Es la foto de perfil del usurio en sesion
 */
/**
 * @swagger
 * /api/file:
 *  post:
 *      summary: Crea una nuevo archivo
 *      tags: [File]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/File'
 *      responses:
 *          200: 
 *            description: New file created   
 */
/**
 * @swagger
 * /api/file:
 *  get:
 *      summary: Obtiene una lista con todos los archivos
 *      tags: [File]
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
 * /api/file/{id}:
 *  get:
 *      summary: Obtiene informacion de un archivo por su ID
 *      tags: [File]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo
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
 * /api/file/{name}:
 *  post:
 *      summary: Obtiene una lista de archivos por nombre
 *      tags: [File]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del archivo
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
 * /api/file/{id}:
 *  put:
 *      summary: Actualiza un archivo por su ID
 *      tags: [File]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/File'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo
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
 * /api/file/{id}:
 *  delete:
 *      summary: Elimina un archivo por su ID
 *      tags: [File]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del archivo
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
 * /api/file:
 *  delete:
 *      summary: Elimina todos los archivos
 *      tags: [File]
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

api.post("/file", Auth, File.addFile);
api.get("/file", Auth, File.listFile);
api.get("/file/:id?", Auth, File.listFileByID);
api.post("/file/:name?", Auth, File.listFile);
api.put('/file/:id', Auth, File.updateFile);
api.delete('/file/:id', Auth, File.deleteFile);
api.delete("/file", Auth, File.deleteAllFiles);

module.exports = api;