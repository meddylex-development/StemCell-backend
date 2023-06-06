let express = require("express");
let Profile = require("../controllers/profile");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Profile:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara el perfil
 *              name: 
 *                  type: string
 *                  description: Nombre del perfil
 *              description:
 *                  type: string
 *                  description: Descripcion del perfil
 *          required:
 *              - idStatus
 *              - name
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Usuarios
 *              description: Perfil de usuarios del sistema
 */
/**
 * @swagger
 * /api/profile:
 *  post:
 *      summary: Crea un nuevo perfil de usuario
 *      tags: [Profile]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Profile'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/profile:
 *  get:
 *      summary: Obtiene una lista con todos los perfiles
 *      tags: [Profile]
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
 * /api/profile/{id}:
 *  get:
 *      summary: Obtiene informacion del perfil por su ID
 *      tags: [Profile]
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
 * /api/profile/{name}:
 *  post:
 *      summary: Obtiene una lista de perfiles por nombre
 *      tags: [Profile]
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
 * /api/profile/{id}:
 *  put:
 *      summary: Actualiza un perfil por su ID
 *      tags: [Profile]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Profile'
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
 * /api/profile/{id}:
 *  delete:
 *      summary: Elimina un perfil por su ID
 *      tags: [Profile]
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
 * /api/profile:
 *  delete:
 *      summary: Elimina todos los perfiles
 *      tags: [Profile]
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

api.post("/profile", Auth, Profile.addProfile);
api.get("/profile", Auth, Profile.listProfiles);
api.get("/profile/:id?", Auth, Profile.listProfileByID);
api.post("/profile/:name?", Auth, Profile.listProfiles);
api.put('/profile/:id', Auth, Profile.updateProfile);
api.delete('/profile/:id', Auth, Profile.deleteProfile);
api.delete("/profile", Auth, Profile.deleteAllProfiles);

module.exports = api;