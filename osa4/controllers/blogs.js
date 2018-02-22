const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { realName: 1, userName: 1 })
  res.json(blogs.map(Blog.Format))
})

blogRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(Blog.Format(blog))
    } else {
      res.status(404).end()
    }
  } catch (exc) {
    console.log(exc)
    res.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.delete('/:id', async (req,res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } else {
      res.status(401).json({ error: 'unauthorized attempt to remove' })
    }
  } catch (exc) {
    if (exc.name === 'JsonWebTokenError') {
      res.status(401).json({ error: exc.message })
    } else {
      console.log(exc)
      res.status(400).send({ error: 'malformatted id' })
    }
  }
})

blogRouter.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token invalid or missing' })
    }

    if (req.body.title === undefined || req.body.url === undefined) {
      return res.status(400).send({ error: 'title AND url required' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes === undefined ? 0 : req.body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(Blog.Format(savedBlog))
  } catch (exc) {
    if (exc.name === 'JsonWebTokenError') {
      res.status(401).json({ error: exc.message })
    } else {
      console.log(exc)
      res.status(500).send({ error: 'dunno what happened' })
    }
  }
})

blogRouter.put('/:id', async (req,res) => {
  try {
    const current = await Blog.findById(req.params.id)
    let blog

    if (current.author === undefined) {
      blog = {
        title: current.title,
        url: current.url,
        likes: req.body.likes
      }
    } else {
      blog = {
        title: current.title,
        author: current.author,
        url: current.url,
        likes: req.body.likes
      }
    }
    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(Blog.Format(blog))
  } catch (exc) {
    console.log(exc)
    res.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogRouter