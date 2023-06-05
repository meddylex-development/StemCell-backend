let express = require("express");
let DocumentType = require("../controllers/documentType");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/document-type", Auth, DocumentType.addDocumentType);
api.get("/document-type", Auth, DocumentType.listDocumentTypes);
api.get("/document-type/:id?", Auth, DocumentType.listDocumentTypeByID);
api.post("/document-type/:name?", Auth, DocumentType.listDocumentTypes);
api.put("/document-type/:id", Auth, DocumentType.updateDocumentType);
api.delete("/document-type/:id", Auth, DocumentType.deleteDocumentType);
api.delete("/document-type", Auth, DocumentType.deleteAllDocumentTypes);

module.exports = api;