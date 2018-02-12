/*const dummy = (blogs) => {
  return 1
}*/

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
  return blogs.map(blog => blog.likes + 5)
}

const mostLikes = (blogs) => {
  return blogs.map(blog => blog.likes + 1)
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}