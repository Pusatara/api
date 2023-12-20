const { is_development } = require('../config/config.js');
const CONFIG = is_development ? require('../config/db.dev.config.js') : require('../config/db.config.js');

const Sequelize = require("sequelize");
const sequelizeConfig = {
  dialect: CONFIG.dialect,
  pool: {
    max: CONFIG.pool.max,
    min: CONFIG.pool.min,
    acquire: CONFIG.pool.acquire,
    idle: CONFIG.pool.idle
  },
};

if (!is_development) {
  sequelizeConfig.dialectOptions = {
    socketPath: CONFIG.socketPath
  };
} else {
  sequelizeConfig.host = CONFIG.HOST;
}

const sequelize = new Sequelize(
  CONFIG.DB,
  CONFIG.USER,
  CONFIG.PASSWORD,
  sequelizeConfig
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.like = require("../models/like.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.post, {
  foreignKey: 'userId'
});
db.post.belongsTo(db.user);
db.user.hasMany(db.like, {
  foreignKey: 'userId'
});
db.like.belongsTo(db.user);
db.user.hasMany(db.comment, {
  foreignKey: 'userId'
});
db.comment.belongsTo(db.user);
db.like.belongsTo(db.post);
db.post.hasMany(db.like, {
  foreignKey: 'postId'
});
db.comment.belongsTo(db.post);
db.post.hasMany(db.comment, {
  foreignKey: 'postId'
});

module.exports = db;
