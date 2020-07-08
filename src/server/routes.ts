import * as express from "express";
import DB from "./db";

const router = express.Router();

router.get("/api/blogs", async (req, res) => {
  try {
    let blogs = await DB.Blogs.getBlogs();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/blogs/:id", async (req, res) => {
  try {
    let blog = await DB.Blogs.getBlog(req.params.id);
    res.json(blog[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/api/blogs", async (req, res) => {
  try {
    res.json(
      await DB.Blogs.newBlog(
        req.body.title,
        req.body.content,
        req.body.author,
        req.body.tag
      )
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/api/blogs/:id", async (req, res) => {
  try {
    res.json(await DB.Blogs.deleteBlog(req.params.id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/api/blogs/:id", async (req, res) => {
  try {
    res.json(
      await DB.Blogs.updateBlog(
        req.body.title,
        req.body.content,
        req.body.author,
        req.body.tag,
        req.params.id
      )
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/blogs/:id/tags", async (req, res) => {
  try {
    res.json(await DB.Blogs.getBlogTags(req.params.id));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/tags", async (req, res) => {
  try {
    res.json(await DB.Blogs.getAllTags());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
