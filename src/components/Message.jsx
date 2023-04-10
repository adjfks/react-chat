import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Message = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="message owner">
      <div className="message-info">
        <img src={currentUser.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>Hello</p>
        <img
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
    </div>
  )
}

export default Message
