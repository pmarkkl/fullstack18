const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    state = ''
    return state
  default:
    return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationClearance = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer