const { createPool } = require("mysql");
/** Connection pool creation - START */
const db = createPool({
  port: 3305,
  host: "localhost",
  user: "root",
  password: "",
  database: "Demo_DB", 
  connectionLimit: 10,
});
/** Connection pool creation - END */

module.exports = db;