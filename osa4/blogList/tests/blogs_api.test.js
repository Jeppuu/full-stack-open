const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await helper.blogsInDb();
  assert.strictEqual(response.length, initialBlogs.length);
});

test("blog identifier is named id", async () => {
  const response = await helper.blogsInDb();
  response.forEach((blog) => {
    assert.ok(blog.id);
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Hello Async/Await",
    author: "John Doe",
    url: "https://example.com/hello-async-await",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();
  const titles = response.map((blog) => blog.title);
  assert.strictEqual(response.length, initialBlogs.length + 1);
  assert(titles.includes(newBlog.title));
});

test("if likes is not defined, it will default to 0", async () => {
  const newBlog = {
    title: "No Likes Blog",
    author: "John Doe",
    url: "https://example.com/no-likes-blog",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await helper.blogsInDb();
  const addedBlog = response.find((blog) => blog.title === newBlog.title);
  assert.strictEqual(addedBlog.likes, 0);
});

test("blog with no title or url responds with 400 Bad Request", async () => {
  const newBlogNoTitle = {
    author: "John Doe",
    url: "https://example.com/no-title-blog",
    likes: 3,
  };

  const newBlogNoUrl = {
    title: "No URL Blog",
    author: "John Doe",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlogNoUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
