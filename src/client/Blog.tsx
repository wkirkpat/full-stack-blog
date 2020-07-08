import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

const Blog: React.FC<IBlogProps> = (props) => {
  const [blog, setBlog] = useState<Blog>({
    title: "",
    content: "",
    authorid: 0,
    name: "",
    id: 0,
  });
  const [tags, setTags] = useState<Tags[]>([]);

  const getBlog = async () => {
    try {
      let r = await fetch(`/api/blogs/${props.match.params.id}`);
      let blog = await r.json();
      console.log(blog);
      setBlog(blog);
    } catch (e) {
      console.log(e);
    }
  };

  const getTags = async () => {
    try {
      let r = await fetch(`/api/blogs/${props.match.params.id}/tags`);
      let tags = await r.json();
      console.log(tags);
      setTags(tags[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlog();
    getTags();
  }, []);

  return (
    <div className="container">
      <h4>{blog.title}</h4>
      <h5>By: {blog.name}</h5>
      {tags.map((tag) => {
        return (
          <span key={tag.id} className="badge badge-secondary">
            {tag.name}
          </span>
        );
      })}
      <div>
        <p className="mt-5">{blog.content}</p>
        <Link to={`/blog/${props.match.params.id}/edit`}>
          <button className="btn btn-primary btn-small">Edit</button>
        </Link>
      </div>
    </div>
  );
};

interface IBlogProps extends RouteComponentProps<{ id: string }> {}

interface Blog {
  title: string;
  content: string;
  authorid: number;
  name: string;
  id: number;
}

interface Tags {
  name: string;
  id: number;
}

export default Blog;
