import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      realname: '',
      user: null,
      error: null,
      blogs: [],
      title: '',
      author: '',
      url: ''
    }
  }

  async componentDidMount() {
    const sortByLikes = (a,b) => {
      return b.likes-a.likes
    }

    const blogs = await blogService.getAll()
    this.setState({ blogs: blogs.sort(sortByLikes) })

    const loggedUserJson = window.localStorage.getItem('loggedBloguser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      this.setState({ user, realname: user.name })
      blogService.setToken(user.token)
    }
    console.log('component did mount')
  }
  
  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBloguser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, realname: user.name })
      console.log(user)
    } catch (exc) {
      console.log(exc)
      this.setState({ error: 'Username or password invalid' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloguser')
    this.setState({ user: null })
  }

  createBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    const response = await blogService.create(blogObject)
    this.setState({ error: `a new blog '${blogObject.title}' by ${blogObject.author} added`, title: '', author: '', url: '', blogs: this.state.blogs.concat(response) })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  like = async (blog) => {
    const updatedObject = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    }
    const response = await blogService.like(blog.id, updatedObject)
    return response
  }

  delete = async (blog) => {
    if (window.confirm(`delete ${blog.title} by ${blog.author} ?`)) {
      await blogService.remove(blog.id)
      this.setState({ blogs: this.state.blogs.filter(b => b.id !== blog.id) })
    }
  }

  render() {
    console.log('render')
    const blogForm = () => {
      return (
      <Togglable buttonLabel="add blog">
        <BlogForm
          onSubmit={this.createBlog}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
          handleFieldChange={this.handleFieldChange}
        />
      </Togglable>
      )
    }

    const loginForm = () => {
      return (
        <LoginForm 
          login={this.login} 
          handleFieldChange={this.handleFieldChange} 
          username={this.state.username} 
          password={this.state.password} 
        />
      )
    }
    if (this.state.user === null) {
      return (
        <div>
        <Notification notification={this.state.error} />
        {loginForm()}
        </div>
      )
    } else {
      return (
        <div>
          <Notification notification={this.state.error} />
          <h2>blogs</h2>
          <p>{this.state.realname} logged in <button onClick={this.logout}>Logout</button></p>
          {blogForm()}<br />
          {this.state.blogs.map(blog => 
            <Blog key={blog.id} blog={blog} like={this.like} delete={this.delete} />
          )}
        </div>
      )
    }
  }
}

export default App
