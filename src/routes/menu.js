let express = require("express");
let Menu = require("../controllers/menu");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Menu:
 *          type: Object
 *          properties: 
 *              idStatus:
 *                  type: string
 *                  description: ID del estado en el cual quedara el menú
 *              name: 
 *                  type: string
 *                  description: Nombre del menú
 *              title: 
 *                  type: string
 *                  description: Titulo del menú
 *              icon: 
 *                  type: string
 *                  description: Icono del menú
 *              link: 
 *                  type: string
 *                  description: url modulo al cual redirige el menú
 *              home: 
 *                  type: boolean
 *                  description: Indica si es o no el menú prinicipal
 *              description:
 *                  type: string
 *                  description: Descripcion del menú
 *          required:
 *              - idStatus
 *              - name
 *              - title
 *              - icon
 *              - link
 *              - home
 *              - description
 *          example:
 *              idStatus: 647a73a6d47ece6731a4d979
 *              name: Menú usuarios
 *              title: Usuarios
 *              icon: fas fa-user
 *              link: /user/home
 *              home: false
 *              description: Menú que navega al modulo de usuarios
 */
/**
 * @swagger
 * /api/menu:
 *  post:
 *      summary: Crea un nuevo item en el menú
 *      tags: [Menu]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Menu'
 *      responses:
 *          200: 
 *            description: New status created   
 */
/**
 * @swagger
 * /api/menu:
 *  get:
 *      summary: Obtiene una lista con todos los menus disponibles
 *      tags: [Menu]
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
 * /api/menu/{id}:
 *  get:
 *      summary: Obtiene informacion del menú por su ID
 *      tags: [Menu]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú
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
 * /api/menu/{name}:
 *  post:
 *      summary: Obtiene una lista de menus por nombre
 *      tags: [Menu]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: name
 *            description: Nombre del menú
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
 * /api/menu/{id}:
 *  put:
 *      summary: Actualiza un menú por su ID
 *      tags: [Menu]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Menu'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú
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
 * /api/menu/{id}:
 *  delete:
 *      summary: Elimina un menú por su ID
 *      tags: [Menu]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del menú
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
 * /api/menu:
 *  delete:
 *      summary: Elimina todos los menus
 *      tags: [Menu]
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

api.post("/menu", Auth, Menu.addMenu);
api.get("/menu", Auth, Menu.listMenus);
api.get("/menu/:id?", Auth, Menu.listMenuByID);
api.post("/menu/:name?", Auth, Menu.listMenus);
api.put("/menu/:id", Auth, Menu.updateMenu);
api.delete("/menu/:id", Auth, Menu.deleteMenu);
api.delete("/menu", Auth, Menu.deleteAllMenus);

module.exports = api;