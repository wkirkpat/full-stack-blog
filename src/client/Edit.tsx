import * as React from "react";
import { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const Edit: React.FC<IEditProps> = (props) => {
  const [blog, setBlog] = useState<Blog>({
    title: "",
    content: "",
    authorid: 0,
    name: "",
    id: 0,
  });

  //Need two separate instances of state for tags, one to represent the options available in the dropdown
  //the other to represent the selected tag for this particular blog
  const [tags, setTags] = useState([]);
  const [blogTag, setBlogTag] = useState("");

  const getTags = async () => {
    try {
      let r = await fetch("/api/tags");
      let tags = await r.json();
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(blogTag);
    fetch(`/api/blogs/${props.match.params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blog.title,
        content: blog.content,
        author: blog.name,
        tag: blogTag,
      }),
    });
  };

  const handleDelete = () => {
    fetch(`/api/blogs/${props.match.params.id}`, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    getBlog();
    getTags();
  }, []);

  return (
    <div className="container p-4">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Title
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          value={`${blog.title}`}
          name="title"
          aria-label="Title"
          aria-describedby="basic-addon1"
          onChange={(e) =>
            setBlog({
              ...blog,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Author
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          value={`${blog.name}`}
          name="name"
          aria-label="Author"
          aria-describedby="basic-addon1"
          onChange={(e) =>
            setBlog({
              ...blog,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>

      <label htmlFor="tag-select">Choose a Tag:</label>
      <select
        onChange={(event) => setBlogTag(event.target.value)}
        id="tag-select"
      >
        <option value="">Please Select a Tag</option>
        {tags.map((tag) => {
          return (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          );
        })}
      </select>

      <div className="input-group">
        <div className="input-group-prepend"></div>
        <textarea
          className="form-control"
          value={`${blog.content}`}
          name="content"
          onChange={(e) =>
            setBlog({
              ...blog,
              [e.target.name]: e.target.value,
            })
          }
          aria-label="Blog Content"
        ></textarea>
      </div>
      <button onClick={handleClick} className="btn btn-primary btn-sm">
        Submit
      </button>
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
    </div>
  );
};

interface IEditProps extends RouteComponentProps<{ id: string }> {}

interface Blog {
  title: string;
  content: string;
  authorid: number;
  name: string;
  id: number;
}

export default Edit;
