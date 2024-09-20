import express from "express";
import cors from "cors";
import { v4 as uuid4 } from "uuid";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// In-memory storage for blog posts (replace with a database in a real application)
let posts = [];

// CREATE: Post a new blog post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  const newPost = { id: uuid4(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// READ: Get all blog posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// READ: Get a specific blog post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// UPDATE: Update a blog post
app.put("/posts/:id", (req, res) => {
  const { title, content } = req.body;
  const postIndex = posts.findIndex((p) => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  if (title && content) {
    posts[postIndex] = { ...posts[postIndex], title, content };
  } else if (title) {
    posts[postIndex] = { ...posts[postIndex], title };
  } else if (content) {
    posts[postIndex] = { ...posts[postIndex], content };
  }
  res.json(posts[postIndex]);
});

// DELETE: Delete a blog post
app.delete("/posts/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts.splice(postIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Blog API listening at http://localhost:${port}`);
});
