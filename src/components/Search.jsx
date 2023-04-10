import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setError] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    )
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setError(true)
    }
  }

  const handleKeydown = (e) => {
    e.key === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    // 用一个chats文档存储会话信息，先判断当前会话是否存在，不存在则创建
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    const chatsRef = doc(db, 'chats', combinedId)
    try {
      const chatsDoc = await getDoc(chatsRef)
      if (!chatsDoc.exists()) {
        // create chats document
        await setDoc(chatsRef, { messages: [] })
        // update userChats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      console.log('err: ', err)
      setError(true)
    }

    setUser(null)
    setUsername('')
  }

  return (
    <div className="search">
      <div className="search-form">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKeydown}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>Something went wrong!</span>}
      {user && (
        <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
