import { createContext, useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: '',
    user: {},
  }
  const stateReducer = (state, action) => {
    switch (action.type) {
      case 'USER_CHANGE':
        return {
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          user: action.payload,
        }
      default:
        console.log('default')
        return state
    }
  }
  const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
