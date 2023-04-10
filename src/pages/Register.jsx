import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [err, setError] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    if (!e.target.files.length) return
    const fr = new FileReader()
    fr.onload = () => {
      setAvatarSrc(fr.result)
    }
    fr.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    console.log('displayName: ', displayName)
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log('res: ', res)

      const storageRef = ref(storage, displayName)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.log('error: ', error)
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              })
              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              })
              await setDoc(doc(db, 'userChats', res.user.uid), {})
              navigate('/')
            } catch (err) {
              console.log('err: ', err)
              setError(true)
            }
          })
        }
      )
    } catch (err) {
      console.log('err: ', err)
      setError(true)
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">Corner Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input
            style={{ display: 'none' }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <img src={Add} alt="add avatar" />
            <span>add avatar</span>
            {avatarSrc && (
              <img
                src={avatarSrc}
                alt=""
                style={{ objectFit: 'cover', height: '80%', width: 'auto' }}
              />
            )}
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
