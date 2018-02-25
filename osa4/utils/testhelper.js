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

const mostBlogs = (blogs) => {
  let counter = {}
  blogs.forEach(blog => {
    counter[blog.author] = counter[blog.author] === undefined ? 1 : (counter[blog.author]+1)
  })
  const most = Object.keys(counter).reduce(function(previous, current) {
    return counter[previous] > counter[current] ? previous : current
  })
  console.log(most, counter[most])
  return {
    author: most,
    blogs: counter[most]
  }
}

const mostLikes = (blogs) => {
  let counter = {}
  blogs.forEach(blog => {
    counter[blog.author] = counter[blog.author] === undefined ? 0 + blog.likes : counter[blog.author] + blog.likes
  })
  console.log(counter)
  const most = Object.keys(counter).reduce(function(previous, current) {
    return counter[previous] > counter[current] ? previous : current
  })
  console.log(most, counter[most])
  return {
    author: most,
    likes: counter[most]
  }
}


module.exports = {
  blogsInDb,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}