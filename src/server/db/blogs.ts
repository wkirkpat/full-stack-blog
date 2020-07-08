import { Connection } from "./index";

export const getBlogs = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT authors.name, blogs.* FROM blogs JOIN authors ON blogs.authorid = authors.id",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const getBlog = async (id: string) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT authors.name, blogs.* FROM blogs JOIN authors ON blogs.authorid = authors.id where blogs.id = ?",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

//spNewBlog checks to see if an author exists and creates a new one if it doesn't before adding the new blog to the database.
//It will also get the author id based on the name prodvided, get the tag id for the given tag
//and add a record to the blogtags table for cross referencing
export const newBlog = async (
  title: string,
  content: string,
  author: string,
  tag: string
) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "call spNewBlog(?,?,?,?)",
      [title, content, author, tag],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  });
};

//Will cascade delete the blogtag records that reference the deleted blog
export const deleteBlog = async (id: string) => {
  return new Promise((resolve, reject) => {
    Connection.query("Delete from blogs where id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

//spUpdateBlog works almsot identically to spNewBlog except it updates an existing record
export const updateBlog = async (
  title: string,
  content: string,
  author: string,
  tag: string,
  id: string
) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "CALL spUpdateBlog(?,?,?,?,?)",
      [title, content, author, tag, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

//This pulls back all the tags associated to a specific blog
export const getBlogTags = async (id: string) => {
  return new Promise((resolve, reject) => {
    Connection.query("Call spBlogTags(?)", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

//This is used to get all the tags to display in the dropdown menu when you select a tag for a blog
export const getAllTags = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * from tags", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export default {
  getBlogs,
  getBlog,
  newBlog,
  deleteBlog,
  updateBlog,
  getBlogTags,
  getAllTags,
};
