module.exports = {
  HOST: process.env.mysql_host_dev,
  USER: process.env.mysql_user_dev,
  PASSWORD: process.env.mysql_password_dev,
  DB: process.env.mysql_db_dev,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
