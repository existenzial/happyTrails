const knex = require("knex");

// Configure Db Connection
const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: `${process.env.MYSQLPWD}`,
    database: "dev"
  }
});

module.exports = db;