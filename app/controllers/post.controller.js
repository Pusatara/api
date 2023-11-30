const db = require("../models");
const Post = db.post;
const Like = db.like;
const Comment = db.comment;

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'Pusatara',
  keyFilename: './app/config/p_sa.json'
});

const bucket = storage.bucket('pusatara-ugc');

exports.createPost = async (req, res) => {
  try {
    // Retrieve user data from the request
    const { userId, title, content, isPoll } = req.body;

    // Create a new post
    const post = await Post.create({
      userId,
      title,
      content,
      isPoll,
      date: new Date()
    });

    res.send({ message: "Post created successfully!", postId: post.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No image file uploaded.' });
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
      res.status(200).send({ message: 'Image uploaded successfully', imageUrl: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const like = await Like.create({
      userId: userId,
      postId: postId
    });

    res.send({ message: "Post liked successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    await Like.destroy({
      where: {
        userId: userId,
        postId: postId
      }
    });

    res.send({ message: "Post unliked successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const comment = await Comment.create({
      userId: userId,
      postId: postId,
      content: content,
      date: new Date()
    });

    res.send({ message: "Comment added successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await Comment.destroy({
      where: {
        id: commentId
      }
    });

    res.send({ message: "Comment deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
