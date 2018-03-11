import anecdoteService from '../services/anecdotes'

const anedcoteReducer = (state = [], action) => {
  if (action.type==='ANECDOTE_INIT') {
    return action.data
  }
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    console.log('ACTION TÄÄLLÄ', action)
    return [...state, { content: action.data.content, id: action.data.id, votes: 0 }]
  }

  return state
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTE_INIT',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.newAnecdote(content)
    dispatch ({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes+1 }
    const response = await anecdoteService.updateAnecdote(votedAnecdote.id, votedAnecdote)
    dispatch ({
      type: 'VOTE',
      id: response.id
    })
  }
}

export default anedcoteReducer