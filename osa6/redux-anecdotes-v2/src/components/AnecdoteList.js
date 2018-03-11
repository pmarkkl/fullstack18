import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { notificationClearance } from '../reducers/notificationReducer'
import Filter from '../components/Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  buttonClicked = (anecdote) => {
    this.props.vote(anecdote.id)
    this.props.notificationChange(`voted for '${anecdote.content}'`)
    setTimeout(() => this.props.notificationClearance(), 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.buttonClicked(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { notificationChange, notificationClearance, vote }
)(AnecdoteList)

export default ConnectedAnecdoteList