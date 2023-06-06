let express = require("express");
let Auth = require("../controllers/auth");
// let Auth = require("../middlewares/auth");
let api = express.Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: Object
 *          properties: 
 *              idStatus: 
 *                  type: string
 *                  description: ID estado
 *              idProfile: 
 *                  type: string
 *                  description: ID perfil
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
 *              idDocumentType: 
 *                  type: string
 *                  description: ID del tipo de documento
 *              idCountry: 
 *                  type: string
 *                  description: ID de la ciudad
 *              idCity: 
 *                  type: string
 *                  description: ID del pais
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
 *              - firstName
 *              - secondFirstName
 *              - lastName
 *              - secondLastName
 *              - idDocumentType
 *              - idCountry
 *              - idCity
 *              - documentNumber
 *              - email
 *              - password
 *              - address
 *              - phoneNumber
 *              - birthDate
 *          example:
 *              idStatus: 232fdfw34534grgdf
 *              idProfile: 6f7d7fddgfvdfggf45
 *              firstName: Alex
 *              secondFirstName: Pepe 
 *              lastName: Perez
 *              secondLastName: Rojas
 *              idDocumentType: 12345435nb5345jh34
 *              idCountry: 345435vhj3453h4534
 *              idCity: 87v6dfgdgdfg8fdg89gf
 *              documentNumber: "12323423444"
 *              email: pepe.perez@test.com
 *              password: PepePerez123
 *              address: CALLE 123 B SUR # 60 A 17, EDIFICIO GALAXIA PISO 4 APTO 402
 *              phoneNumber: "3103445566"
 *              birthDate: 242343243242
 */
/**
 * @swagger
 * /api/auth/sign-up:
 *  post:
 *      summary: Crea un nuevo usuario - sin autenticacion
 *      tags: [Auth]
 *      description: "Esta API crea un nuevo usuario en la base de datos y retorna un objeto json con el estado de la peticion"
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      $ref: '#/components/schemas/Auth'
 *      responses:
 *          200: 
 *            description: Test sign up   
 */
/**
 * @swagger
 * /api/auth/sign-in:
 *  post:
 *      summary: Autentica usuario en el sistema - sin autenticacion
 *      tags: [Auth]
 *      description: "Esta API crea un nuevo usuario en la base de datos y retorna un objeto json con el estado de la peticion"
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      properties: 
 *                          email: 
 *                              type: string
 *                              description: Correo electronico
 *                          password: 
 *                              type: string
 *                              description: Contraseña
 *                          rememberMe: 
 *                              type: boolean
 *                              description: Recordar sesion
 *                      required:
 *                          - email
 *                          - password
 *                          - rememberMe
 *                      example:
 *                          email: pepe.perez@test.com
 *                          password: PepePerez123
 *                          rememberMe: true
 *      responses:
 *          200: 
 *            description: Test sign in 
 */


api.post("/auth/sign-up", Auth.userSignUp);
api.post("/auth/sign-in", Auth.userSignIn);

module.exports = api;