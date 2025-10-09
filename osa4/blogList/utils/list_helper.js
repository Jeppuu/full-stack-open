const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce(
    (fav, blog) => (blog.likes > fav.likes ? blog : fav),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const authorCounts = blogs.reduce((counts, { author }) => {
    counts[author] = (counts[author] || 0) + 1;
    return counts;
  }, {});

  const mostWrittenAuthor = Object.entries(authorCounts).reduce(
    (mostSoFar, [author, count]) =>
      count > mostSoFar.count ? { author, count } : mostSoFar,
    { author: "", count: 0 }
  );

  return { author: mostWrittenAuthor.author, blogs: mostWrittenAuthor.count };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
