import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { auth } from '../firebase'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const logout = () => {
    dispatch({})
    signOut(auth)
  }
  return (
    <div className="navbar">
      <span className="logo">Corner Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="user avatar" />
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
