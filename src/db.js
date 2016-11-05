const knex = require("knex");
require("env2")("config.env");

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: `${process.env.MYSQLPWD}`,
    database: "happytrails"
  }
});

module.exports = db;