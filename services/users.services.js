const db = require("../config/db.config");

exports.register = (data, callBack) => {
  db.query(
    "INSERT INTO users(firstName, lastName, emailId, password) VALUES(?,?,?,?)",
    [data.firstName, data.lastName, data.emailId, data.password],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, "Registration successful");
    }
  );
};

exports.login = (data, callBack) => {
  db.query(
    "SELECT * FROM users WHERE emailId = ? AND password = ?",
    [data.emailId, data.password],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.length > 0) {
        return callBack(null, results);
      } else {
        return callBack("Invalid credentials");
      }
    }
  );
};
