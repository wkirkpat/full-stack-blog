import { Connection } from "./index";

export const getBlogs = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("Select * from blogs", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const getBlog = async (id: string) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "Select * from blogs where id = ?",
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
  authorid: string,
  tag: string
) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "call spNewBlog(?,?,?,?)",
      [title, content, authorid, tag],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  })
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

export const getBlogTags = async (id:string) => {
    return new Promise((resolve, reject) => {
        Connection.query("Call spBlogTags(?)", [id], (err, results) => {
            if(err) {
                return reject(err)
            }
            resolve(results);
        })
    })
}

export default {
  getBlogs,
  getBlog,
  newBlog,
  deleteBlog,
  updateBlog,
  getBlogTags
};
