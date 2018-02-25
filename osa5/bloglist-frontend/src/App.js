import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

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

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJson = window.localStorage.getItem('loggedBloguser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      this.setState({ user, realname: user.name })
      blogService.setToken(user.token)
    }
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
      this.setState({ error: 'käyttäjätunnus tai salasana on virheellinen' })
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
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    const response = await blogService.create(blogObject)
    console.log(response)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
        error: {this.state.error}<br />
        <h1>Login to application</h1>
        <form onSubmit={this.login}>
          username: <input type="text" name="username" value={this.state.username} onChange={this.handleFieldChange}/><br />
          password: <input type="password" name="password" value={this.state.password} onChange={this.handleFieldChange}/><br />
          <button type="submit">login</button>
        </form>
        </div>
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <p>{this.state.realname} logged in <button onClick={this.logout}>Logout</button></p>
          {this.state.blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
          <h2>create new blog</h2>
          <form onSubmit={this.createBlog}>
          title: <input type="text" name="title" value={this.state.title} onChange={this.handleFieldChange}/><br />
          author: <input type="text" name="author" value={this.state.author} onChange={this.handleFieldChange}/><br />
          url: <input type="text" name="url" value={this.state.url} onChange={this.handleFieldChange}/><br />
          <button type="submit">add blog</button>
          </form>
        </div>
      )
    }
  }
}

export default App;
