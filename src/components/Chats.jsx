import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(
          Object.entries(doc.data())
            .sort((a, b) => b[1].date - a[1].date)
            .map((chat) => ({
              id: chat[0],
              userInfo: chat[1].userInfo,
              date: chat[1].date,
              lastMessage: chat[1].lastMessage,
              active: false,
            }))
        )
      })

      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])

  const { dispatch } = useContext(ChatContext)
  const handleSelect = (chat) => {
    setChats(
      chats.map((item) => {
        if (item.id === chat.id)
          return {
            ...item,
            active: true,
          }
        return {
          ...item,
          active: false,
        }
      })
    )
    dispatch({
      type: 'USER_CHANGE',
      payload: chat.userInfo,
    })
  }

  return (
    <div className="chats">
      {chats.map((chat) => {
        return (
          <div
            className={`user-chat${chat.active ? ' active' : ''}`}
            key={chat.id}
            onClick={() => handleSelect(chat)}
          >
            <img src={chat.userInfo.photoURL} alt="" />
            <div className="user-chat-info">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.lastMessage?.text || ''}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Chats
