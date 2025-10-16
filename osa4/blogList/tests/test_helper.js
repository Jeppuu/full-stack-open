const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First Blog",
    author: "John Doe",
    url: "https://example.com/first-blog",
    likes: 5,
  },
  {
    title: "Second Blog",
    author: "Jane Doe",
    url: "https://example.com/second-blog",
    likes: 12,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "Foo Fighters",
    url: "http://tempurl.com",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
