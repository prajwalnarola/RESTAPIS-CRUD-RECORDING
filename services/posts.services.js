const db = require("../config/db.config");

exports.addPost = (data, callBack) => {
  db.query(
    "INSERT INTO posts (description, imagePath, datetimeCreated, addedByUserId) values(?,?,?,?)",
    [data.description, data.imagePath, new Date(), data.addedByUserId],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, "Post added successfully");
    }
  );
};

exports.getAllPosts = (data, callBack) => {
  db.query(
    `SELECT p.id AS postId, p.description, p.datetimeCreated, 
        p.likeCount, p.dislikeCount, p.addedByUserId, u.firstName, u.lastName 
        FROM posts AS p INNER JOIN users AS u ON p.addedByUserId = u.id`,
    [],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

exports.addPostComment = (data, callBack) => {
  db.query(
    "insert into comments(postId, comment, datetimeCreated, addedByUserId) values(?,?,?,?)",
    [data.postId, data.comment, new Date(), data.addedByUserId],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, "Comment added successfully");
    }
  );
};

exports.getPostAllComments = (data, callBack) => {
  db.query(
    `SELECT c.comment, c.datetimeCreated, c.addedByUserId, u.firstName, u.lastName
        FROM comments AS c INNER JOIN users AS u ON c.addedByUserId = u.id
        WHERE c.postId = ?`,
    [data.postId],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

exports.likePost = (data, callBack) => {
  db.query(
    `update posts set likeCount = likeCount + 1 where id = ?`,
    [data.postId],

    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      if (results.affectedRows === 1) {
        return callBack(null, "Like successful");
      } else {
        return callBack(new Error("Invalid post"));
      }
    }
  );
};

exports.dislikePost = (data, callBack) => {
    db.query(
      `update posts set dislikeCount = dislikeCount + 1 where id = ?`,
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows === 1) {
          return callBack(null, "DislikePost successful");
        } else {
          return callBack(new Error("Invalid post"));
        }
      }
    );
  };

  exports.deletePost = (data, callBack) => {
    db.query(
      `delete from posts where id = ?`,
      [data.postId],
  
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results.affectedRows === 1) {
          return callBack(null, "Post deleted successful");
        } else {
          return callBack(new Error("Invalid post"));
        }
      }
    );
  };
