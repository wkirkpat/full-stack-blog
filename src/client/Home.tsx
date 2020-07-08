import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC<IHomeProps> = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      let r = await fetch("/api/blogs");
      let blogs = await r.json();
      console.log(blogs);
      setBlogs(blogs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} className="card ">
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">By: {blog.name}</h6>
              <Link to={`/blog/${blog.id}`}>
                <button className="btn btn-primary btn-sm">Read More</button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

interface IHomeProps {}

export default Home;
