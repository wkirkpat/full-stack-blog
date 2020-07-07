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

export const updateBlog = async (
  title: string,
  content: string,
  id: string
) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "Update blogs set title = ?, content = ? where id = ?",
      [title, content, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

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
