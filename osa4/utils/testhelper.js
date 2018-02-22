const Blog = require('../models/blog')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.Format)
}

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(function(sum, blog){
    return sum+blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let object = { likes: 0 }
  blogs.forEach(blog => {
    object = (blog.likes > object.likes) ? blog : object
  })
  return {
    title: object.title,
    author: object.author,
    likes: object.likes
  }
}


module.exports = {
  blogsInDb,
  dummy,
  totalLikes,
  favoriteBlog
}