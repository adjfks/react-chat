import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Corner Chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>John</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar
