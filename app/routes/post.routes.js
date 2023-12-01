const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = function(app) {
  app.post('/api/posts/create', [authJwt.verifyToken, upload.single('image')], controller.createPost);
  app.get('/api/posts/:id', authJwt.verifyToken, controller.getPostById);
  app.get('/api/posts', authJwt.verifyToken, controller.getPosts);
  app.post("/api/posts/like", authJwt.verifyToken, controller.likePost);
  app.delete("/api/posts/unlike", authJwt.verifyToken, controller.unlikePost);
  app.post("/api/posts/comment", authJwt.verifyToken, controller.addComment);
  app.delete("/api/posts/comment/:commentId", authJwt.verifyToken, controller.deleteComment);
};
