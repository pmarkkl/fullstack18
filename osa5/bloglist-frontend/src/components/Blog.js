import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: props.blog,
      likes: props.blog.likes
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = async () => {
    const response = await this.props.like(this.state.blog)
    this.setState({ likes: response.likes })
    console.log('liked')
  }

  render() {
    const hideWhenVisible = {
      display: this.state.visible ? 'none' : '',
      border: 'solid',
      padding: 5,
      borderWidth: 1,
      marginBottom: 5
    }
    const showWhenVisible = {
      display: this.state.visible ? '' : 'none',
      border: 'solid',
      padding: 5,
      borderWidth: 1,
      marginBottom: 5,
      background: '#FFFFFF'
    }

    return (
      <div>
        <div style={hideWhenVisible} onClick={this.toggleVisibility} className="untoggled">
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={showWhenVisible} onClick={this.toggleVisibility} className="toggled">
          {this.state.blog.title} {this.state.blog.author}<br />
          {this.state.likes} likes <button onClick={() => this.like()}>like</button><br />
          added by {this.state.blog.user.realName}<br />
          <button onClick={() => this.props.delete(this.state.blog)}>delete</button>
        </div>
      </div>
    )
  }
}

export default Blog