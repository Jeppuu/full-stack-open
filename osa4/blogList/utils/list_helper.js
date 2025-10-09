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

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  const authorLikes = blogs.reduce((likes, { author, likes: blogLikes }) => {
    likes[author] = (likes[author] || 0) + blogLikes;
    return likes;
  }, {});

  const mostLikedAuthor = Object.entries(authorLikes).reduce(
    (mostSoFar, [author, likes]) =>
      likes > mostSoFar.likes ? { author, likes } : mostSoFar,
    { author: "", likes: 0 }
  );

  return { author: mostLikedAuthor.author, likes: mostLikedAuthor.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostLikes,
  mostBlogs,
};
