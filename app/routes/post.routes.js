const controller = require("../controllers/post.controller");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


module.exports = function(app) {
  app.post("/api/post/create", controller.createPost);
  app.post('/api/post/uploadImage', upload.single('image'), controller.uploadImage);
  app.post("/api/post/like", controller.likePost);
  app.delete("/api/post/unlike", controller.unlikePost);
  app.post("/api/post/comment", controller.addComment);
  app.delete("/api/post/comment/:commentId", controller.deleteComment);
};
