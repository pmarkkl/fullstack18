import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ({ login, handleFieldChange, username, password }) => {
  return (
    <div>
    <h1>Login to application</h1>
    <form onSubmit={login}>
      username: <input type="text" name="username" value={username} onChange={handleFieldChange}/><br />
      password: <input type="password" name="password" value={password} onChange={handleFieldChange}/><br />
      <button type="submit">login</button>
    </form>
  </div>
  )
}

LoginForm.propTypes = {
  login: propTypes.func.isRequired,
  handleFieldChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
}

export default LoginForm