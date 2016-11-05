const knex = require("knex");
require("env2")("config.env");

const db = knex({
  client: "mysql",
  connection: {
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USR}`,
    password: `${process.env.MYSQL_PWD}`,
    database: `${process.env.MYSQL_DB}`
  }
});

module.exports = db;