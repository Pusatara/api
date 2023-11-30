module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    postId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  });

  return Like;
};
