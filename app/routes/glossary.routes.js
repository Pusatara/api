const controllers = require("../controllers/glossary.controller.js");

module.exports = function(app) {
  app.get("/api/glossary", controllers.getGlossary);
  app.get("/api/glossary/:id", controllers.getGlossaryById);
}
