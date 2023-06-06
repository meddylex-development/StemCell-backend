let express = require("express");
let MenuProfile = require("../controllers/menuProfile");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      MenuProfile:
 *          type: Object
 *          properties: 
 *              idProfile:
 *                  type: string
 *                  description: ID del perfil al cual esta asociado el menú
 *              idMenu:
 *                  type: string
 *                  description: ID del menu
 *              description:
 *                  type: string
 *                  description: Descripcion de la asociacion menu - perfil
 *          required:
 *              - idProfile
 *              - idMenu
 *              - description
 *          example:
 *              idProfile: 6478d2e4ea2a65bf339e75f0
 *              idMenu: 6478e2982bdb19d7626a5f5d
 *              description: Perfil de usuarios del sistema
 */
/**
 * @swagger
 * /api/menu-profile:
 *  post:
 *      summary: Crea una nueva asociasion menú - perfil
 *      tags: [MenuProfile]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/MenuProfile'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/menu-profile:
 *  get:
 *      summary: Obtiene una lista con todas las asociasiones de menú - perfil
 *      tags: [MenuProfile]
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
 * /api/menu-profile/{id}:
 *  get:
 *      summary: Obtiene informacion de asociasion menú - perfil por su ID
 *      tags: [MenuProfile]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú - perfil
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
 * /api/menu-profile/{description}:
 *  post:
 *      summary: Obtiene una lista de asociasiones menú - perfil por descripcion
 *      tags: [MenuProfile]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: description
 *            description: Descripcion de la asociacion menú - perfil
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
 * /api/menu-profile/{id}:
 *  put:
 *      summary: Actualiza un menú - perfil por su ID
 *      tags: [MenuProfile]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/MenuProfile'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú - perfil
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
 * /api/menu-profile/{id}:
 *  delete:
 *      summary: Elimina un menú - perfil por su ID
 *      tags: [MenuProfile]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú - perfil
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
 * /api/menu-profile:
 *  delete:
 *      summary: Elimina todos los menus - perfil 
 *      tags: [MenuProfile]
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


api.post("/menu-profile", Auth, MenuProfile.addMenuProfile);
api.get("/menu-profile", Auth, MenuProfile.listMenuProfiles);
api.get("/menu-profile/:id?", Auth, MenuProfile.listMenuProfileByID);
api.post("/menu-profile/:description?", Auth, MenuProfile.listMenuProfiles);
api.put("/menu-profile/:id", Auth, MenuProfile.updateMenuProfile);
api.delete("/menu-profile/:id", Auth, MenuProfile.deleteMenuProfile);
api.delete("/menu-profile", Auth, MenuProfile.deleteAllMenusProfile);

module.exports = api;