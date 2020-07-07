import * as React from "react";
import { useState, useEffect } from "react";

const AddBlog: React.FC<IAddBlogProps> = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogTag, setBlogTag] = useState("");
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      let r = await fetch("/api/tags");
      let tags = await r.json();
      setTags(tags);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetch("api/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blogTitle,
        content: blogContent,
        author: blogAuthor,
        tag: blogTag,
      }),
    });
  };

  useEffect(() => {
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
          placeholder="Blog Title"
          aria-label="Title"
          aria-describedby="basic-addon1"
          onChange={(event) => setBlogTitle(event.target.value)}
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
          placeholder="Author Name"
          aria-label="Author"
          aria-describedby="basic-addon1"
          onChange={(event) => setBlogAuthor(event.target.value)}
        />
      </div>

      <label htmlFor="tag-select">Choose a Tag:</label>
      <select
        onChange={(event) => setBlogTag(event.target.value)}
        name="Tags"
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
          onChange={(event) => setBlogContent(event.target.value)}
          aria-label="Blog Content"
        ></textarea>
      </div>
      <button onClick={handleClick} className="btn btn-primary btn-sm">
        Submit
      </button>
    </div>
  );
};

interface IAddBlogProps {}

export default AddBlog;
