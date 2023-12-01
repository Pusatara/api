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
    // Check if an image file is provided
    if (!req.file) {
      return res.status(400).send({ message: 'Image file is required.' });
    }

    // Retrieve user data and image file from the request
    const { userId, title, content, isPoll } = req.body;
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    let imageUrl;

    // Upload the image file
    await new Promise((resolve, reject) => {
      blobStream.on('error', err => reject(err));
      blobStream.on('finish', () => {
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve();
      });
      blobStream.end(req.file.buffer);
    });

    // Create a new post with the image URL
    const post = await Post.create({
      userId,
      title,
      content,
      isPoll,
      imageUrl,
      date: new Date()
    });

    res.send({ message: "Post created successfully!", postId: post.id, imageUrl });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(500).send({ message: 'An unknown error occurred.' });
    }
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