import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Container, Header, Table, Grid, Form, Input, Segment, Button } from 'semantic-ui-react'

const menuStyle = {
  div: {
    overflow: 'hidden',
    backgroundColor: '#202A33',
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  link: {
    color: 'white',
    fontSize: 20,
    textDecoration: 'none',
    padding: 10
  },
  jees: {
    backgroundColor: '#4d6479' 
  }
}

const Menu = ({ clearNotification }) => (
  <div style={menuStyle.div}> 
      <NavLink exact style={menuStyle.link} onClick={clearNotification} activeStyle={menuStyle.jees} to="/">anecdotes</NavLink>
      <NavLink exact style={menuStyle.link} onClick={clearNotification} activeStyle={menuStyle.jees} to="/create">create new</NavLink>
      <NavLink exact style={menuStyle.link} onClick={clearNotification} activeStyle={menuStyle.jees} to="/about">about</NavLink>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header size="large">Anecdotes</Header>

    <Table celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
        </Table.Row>
        )}
      </Table.Body>
    </Table> 
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <Segment inverted>
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
    </div>
    </Segment>
  )
}

const About = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={11}>
        <Header size="huge">About anecdote app</Header>
        <p>According to Wikipedia:</p>
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={5}>
      <img src="https://i.imgur.com/yPIPl5z.jpg" alt="Dennis Ritchie" />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const footerStyle = {
  marginTop: 30
}

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/puhuri666/fullstack18/tree/master/osa6/routed-anecdotes'>https://github.com/puhuri666/fullstack18/tree/master/osa6/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({ content: '', author: '', info: ''})
  }

  render() {
    return(
      <div>
        <Header size="huge">create a new anecdote</Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <label>Content:</label>
            <Form.Group>
              <Form.TextArea name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Group>
            <label>Author:</label>
            <Form.Group>
              <Form.Input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Group>
            <label>Info:</label>
            <Form.Group>
              <Form.Input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>

      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote)})
    this.setState({ notification: `a new anecdote '${anecdote.content}' added!` })
    setTimeout(() => this.clearNotification(), 10000)
  }

  clearNotification = () => {
    console.log('klik clearnotification')
    this.setState({ notification: '' })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    const notificationStyle = {
      display: this.state.notification ? '' : 'none',
      color: '#202A33',
      fontSize: 24,
      padding: 10,
      border: '1px solid #202A33',
      borderRadius: 7,
      marginBottom: 20
    }

    const header = {
      paddingTop: 40,
      paddingBottom: 40,
      backgroundColor: '#EFEFEF'
    }
    
    return (
      <Container>
        <div>
          <div style={header}>
          <Header size="huge" textAlign="center">Software anecdotes</Header>
          </div>
          <Router>
            <div>
              <div>
                <Menu clearNotification={ () => this.clearNotification() }/>
                <div style={notificationStyle}>
                  {this.state.notification}
                </div>
                <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>} />
                <Route path="/create" render={() =>
                  this.state.notification
                  ? <Redirect to="/" />
                  : <CreateNew addNew={this.addNew} /> } />
                <Route path="/about" render={() => <About />} />
                <Route exact path="/anecdotes/:id" render={({match}) =>
                  <Anecdote anecdote={this.anecdoteById(match.params.id)} /> } 
                />
              </div>
          <Footer />
          </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
