import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(
          Object.entries(doc.data()).map((chat) => ({
            id: chat[0],
            userInfo: chat[1].userInfo,
            date: chat[1].date,
          }))
        )
      })
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])
  return (
    <div className="chats">
      {chats.map((chat) => {
        return (
          <div className="user-chat" key={chat.id}>
            <img src={chat.userInfo.photoURL} alt="" />
            <div className="user-chat-info">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.userInfo.lastMessage?.text || ''}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Chats
