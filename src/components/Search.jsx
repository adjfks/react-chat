import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="search-form">
        <input type="text" placeholder='find a user'/>
      </div>
      <div className="user-chat">
        <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <div className="user-chat-info">
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default Search
