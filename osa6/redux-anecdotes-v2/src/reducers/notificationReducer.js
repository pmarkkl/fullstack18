const notificationReducer = (state = '', action) => {
  console.log(action)
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

export const notify = (notification, timeout) => {
  return (dispatch) => {
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(notificationClearance())
    }, timeout*1000)
  }
}

export default notificationReducer