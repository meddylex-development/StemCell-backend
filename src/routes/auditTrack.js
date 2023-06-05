let express = require("express");
let AuditTrack = require("../controllers/auditTrack");
let Auth = require("../middlewares/auth");
let api = express.Router();

api.post("/audit-track", Auth, AuditTrack.addAuditTrack);
api.get("/audit-track", Auth, AuditTrack.listAuditTrack);
api.get("/audit-track/:id", Auth, AuditTrack.listAuditTrackByID);
api.post("/audit-track/:description?", Auth, AuditTrack.listAuditTrack);
api.put('/audit-track/:id', Auth, AuditTrack.updateAuditTrack);
api.delete('/audit-track/:id', Auth, AuditTrack.deleteAuditTrack);
api.delete('/audit-track', Auth, AuditTrack.deleteAllAuditTrack);

module.exports = api;