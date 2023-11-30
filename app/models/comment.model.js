module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE
    }
  });

  return Comment;
};
