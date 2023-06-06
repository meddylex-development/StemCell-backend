let express = require("express");
let Status = require("../controllers/status");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Status:
 *          type: Object
 *          properties: 
 *              name: 
 *                  type: string
 *                  description: Nombre estado
 *              description:
 *                  type: string
 *                  description: Descripcion del estado
 *          required:
 *              - name
 *              - description
 *          example:
 *              name: Desactivado
 *              description: Estado desactivado - Marca un usuario u otro elemento como desactivado del sistema
 */
/**
 * @swagger
 * /api/status:
 *  post:
 *      summary: Crea un nuevo estado
 *      tags: [Status]
 *      description: "Esta API crea un nuevo estado en la base de datos y retorna un objeto json con el estado de la peticion"
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Status'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/status:
 *  get:
 *      summary: Obtiene una lista con todos los estados
 *      tags: [Status]
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
 * /api/status/{id}:
 *  get:
 *      summary: Obtiene informacion del estado por su ID
 *      tags: [Status]
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
 * /api/status/{name}:
 *  post:
 *      summary: Obtiene una lista de estados por nombre
 *      tags: [Status]
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
 * /api/status/{id}:
 *  put:
 *      summary: Actualiza un estado por su ID
 *      tags: [Status]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Status'
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
 * /api/status/{id}:
 *  delete:
 *      summary: Elimina un estado por su ID
 *      tags: [Status]
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
 * /api/status:
 *  delete:
 *      summary: Elimina todos los estados
 *      tags: [Status]
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

api.post("/status", Auth, Status.addStatus);
api.get("/status", Auth, Status.listStatus);
api.get("/status/:id?", Auth, Status.listStatusByID);
api.post("/status/:name?", Auth, Status.listStatus);
api.put("/status/:id", Auth, Status.updateStatus);
api.delete("/status/:id", Auth, Status.deleteStatus);
api.delete("/status", Auth, Status.deleteAllStatus);

module.exports = api;