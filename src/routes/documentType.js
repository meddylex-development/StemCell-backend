let express = require("express");
let DocumentType = require("../controllers/documentType");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      DocumentType:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara el tipo de documento
 *              name: 
 *                  type: string
 *                  description: Nombre del tipo de documento
 *              description:
 *                  type: string
 *                  description: Descripcion del tipo de documento
 *          required:
 *              - idStatus
 *              - name
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Cedula de ciudadania
 *              description: Este documento identificia a un ciudadano de nacionalidad ...
 */
/**
 * @swagger
 * /api/document-type:
 *  post:
 *      summary: Crea un nuevo tipo de documento
 *      tags: [DocumentType]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/DocumentType'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/document-type:
 *  get:
 *      summary: Obtiene una lista con todos los tipos de documento
 *      tags: [DocumentType]
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
 * /api/document-type/{id}:
 *  get:
 *      summary: Obtiene informacion del tipo de documento por su ID
 *      tags: [DocumentType]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del estado
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
 * /api/document-type/{name}:
 *  post:
 *      summary: Obtiene una lista de tipos de documento por nombre
 *      tags: [DocumentType]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del estado
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
 * /api/document-type/{id}:
 *  put:
 *      summary: Actualiza un tipo de documento por su ID
 *      tags: [DocumentType]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/DocumentType'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Nombre del estado
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
 * /api/document-type/{id}:
 *  delete:
 *      summary: Elimina un tipo de documento por su ID
 *      tags: [DocumentType]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del estado
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
 * /api/document-type:
 *  delete:
 *      summary: Elimina todos los tipos de documento
 *      tags: [DocumentType]
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

api.post("/document-type", Auth, DocumentType.addDocumentType);
api.get("/document-type", Auth, DocumentType.listDocumentTypes);
api.get("/document-type/:id?", Auth, DocumentType.listDocumentTypeByID);
api.post("/document-type/:name?", Auth, DocumentType.listDocumentTypes);
api.put("/document-type/:id", Auth, DocumentType.updateDocumentType);
api.delete("/document-type/:id", Auth, DocumentType.deleteDocumentType);
api.delete("/document-type", Auth, DocumentType.deleteAllDocumentTypes);

module.exports = api;