let express = require("express");
let User = require("../controllers/user");
let Auth = require("../middlewares/auth");
let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: Object
 *          properties: 
 *              idStatus: 
 *                  type: string
 *                  description: ID estado
 *              idProfile: 
 *                  type: string
 *                  description: ID perfil
 *              idDocumentType: 
 *                  type: string
 *                  description: ID del tipo de documento
 *              idCountry: 
 *                  type: string
 *                  description: ID de la ciudad
 *              idCity: 
 *                  type: string
 *                  description: ID del pais
 *              idLanguage: 
 *                  type: string
 *                  description: ID del lenguaje
 *              idFile: 
 *                  type: string
 *                  description: ID de la foto de perfil
 *              idAddress: 
 *                  type: string
 *                  description: ID de la direccion de residencia
 *              verifiedAccount: 
 *                  type: boolean
 *                  description: Valida si la cuenta esta activa
 *              sessionStatus: 
 *                  type: boolean
 *                  description: Estado de session - Online / Offline
 *              firstName: 
 *                  type: string
 *                  description: Primer nombre
 *              secondFirstName: 
 *                  type: string
 *                  description: Segundo nombre
 *              lastName: 
 *                  type: string
 *                  description: Primer apellido
 *              secondLastName: 
 *                  type: string
 *                  description: Segundo apellido
 *              documentNumber: 
 *                  type: string
 *                  description: Numero de documento
 *              email: 
 *                  type: string
 *                  description: Correo electronico
 *              password: 
 *                  type: string
 *                  description: Contraseña
 *              address: 
 *                  type: string
 *                  description: Direccion de residencia
 *              phoneNumber: 
 *                  type: string
 *                  description: Numero de telefono
 *              birthDate: 
 *                  type: integer
 *                  description: Fecha de nacimiento
 *          required:
 *              - idStatus
 *              - idProfile
 *              - idDocumentType
 *              - idCountry
 *              - idCity
 *              - idLanguage
 *              - idFile
 *              - idAddress
 *              - verifiedAccount
 *              - sessionStatus
 *              - firstName
 *              - secondFirstName
 *              - lastName
 *              - secondLastName
 *              - documentNumber
 *              - email
 *              - password
 *              - address
 *              - phoneNumber
 *              - birthDate
 *          example:
 *              idStatus: 232fdfw34534grgdf
 *              idProfile: 6f7d7fddgfvdfggf45
 *              idDocumentType: 12345435nb5345jh34
 *              idCountry: 345435vhj3453h4534
 *              idCity: 87v6dfgdgdfg8fdg89gf
 *              idLanguage: 87v6dfgdgdfg8fdg89gf
 *              idFile: 87v6dfgdgdfg8fdg89gf
 *              idAddress: 87v6dfgdgdfg8fdg89gf
 *              verifiedAccount: false
 *              sessionStatus: false
 *              firstName: Alex
 *              secondFirstName: Pepe 
 *              lastName: Perez
 *              secondLastName: Rojas
 *              documentNumber: "12323423444"
 *              email: pepe.perez@test.com
 *              password: PepePerez123
 *              address: CALLE 123 B SUR # 60 A 17, EDIFICIO GALAXIA PISO 4 APTO 402
 *              phoneNumber: "3103445566"
 *              birthDate: 242343243242
 */
/**
 * @swagger
 * /api/user:
 *  post:
 *      summary: Crea un nuevo usuario
 *      tags: [User]
 *      description: "Esta API crea un nuevo usuario en la base de datos y retorna un objeto json con el estado de la peticion"
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200: 
 *            description: New user created   
 */
/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Obtiene una lista con todos los usuarios
 *      tags: [User]
 *      description: "Esta API retorna una lista de todos los usuarios existentes en la base de datos"
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
 * /api/user/{id}:
 *  get:
 *      summary: Obtiene informacion del usuario por su ID
 *      tags: [User]
 *      description: "Esta API retorna la informacion de un usuario consultado por su ID"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
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
 * /api/user/{documentNumber}:
 *  post:
 *      summary: Obtiene informacion del usuario por su numero de documento
 *      tags: [User]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: documentNumber
 *            description: Numero de documento del usuario
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
 * /api/user/{id}:
 *  put:
 *      summary: Actualiza un usuario por su ID
 *      tags: [User]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/User'
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
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
 * /api/user/{id}:
 *  delete:
 *      summary: Elimina un usuario por su ID
 *      tags: [User]
 *      description: "The endpoint returns a simple json object"
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: ID del usuario
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
 * /api/user:
 *  delete:
 *      summary: Elimina todos los usuarios
 *      tags: [User]
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

api.post("/user", Auth, User.addUser);
api.get("/user", Auth, User.listUser);
api.get("/user/:id?", Auth, User.listUserByID);
api.post("/user/:documentNumber?", Auth, User.listUser);
api.put("/user/:id", Auth, User.updateUser);
api.delete("/user/:id", Auth, User.deleteUser);
api.delete("/user", Auth, User.deleteAllUser);

module.exports = api;