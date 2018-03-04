import React from 'react';

class App extends React.Component {

  vote = (id) => {
    console.log('voted', id)
    const action = {
      type: 'VOTE',
      data: {
        id: id
      }
    }
    this.props.store.dispatch(action)
    this.props.store.dispatch({ type: 'SORT' })
  }

  createAnecdote = (event) => {
    event.preventDefault()
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: event.target.anecdote.value
      }
    }
    this.props.store.dispatch(action)
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    console.log('STATE NOW App.js', this.props.store.getState())
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input type="text" name="anecdote"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App