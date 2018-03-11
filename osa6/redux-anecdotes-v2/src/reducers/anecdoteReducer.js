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
    return [...state, { content: action.content.content, id: action.content.id, votes: 0 }]
  }

  return state
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'ANECDOTE_INIT',
    data
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export default anedcoteReducer