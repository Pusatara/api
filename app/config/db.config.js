module.exports = {
  HOST: process.env.mysql_host,
  USER: process.env.mysql_user,
  PASSWORD: process.env.mysql_password,
  DB: process.env.mysql_db,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
