module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    isPoll: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    date: {
      type: Sequelize.DATE
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Post;
};
