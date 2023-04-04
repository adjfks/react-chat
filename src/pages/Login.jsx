import React from 'react'

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Corner Chat</span>
        <span className="title">Login</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
        </form>
        <p>You don't have an account? Sign Up</p>
      </div>
    </div>
  )
}

export default Login
