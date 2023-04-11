import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  useEffect(() => {
    let unsub = null
    if (data.chatId) {
      unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })
    }
    return () => {
      unsub && unsub()
    }
  }, [data.chatId])

  console.log(messages)
  return (
    <div className="messages">
      {messages.map((m) => {
        return <Message message={m} key={m.id} />
      })}
    </div>
  )
}

export default Messages
