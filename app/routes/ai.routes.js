const { authJwt } = require("../middleware");
const controller = require("../controllers/ai.controller");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = function(app) {
  app.post('/api/ai/', [authJwt.verifyToken, upload.single('image')], controller.getPrediction);
};
