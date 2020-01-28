import React, { useRef } from 'react'
import './chat.scss';

const fakeMessages = [
  {
    username: "doge",
      message: "sadjkl;kjfwaf;asdasd; ".repeat(10)
  },
  // {
  //   username: "doge",
  //     message: "sadjkl;kjfwaf;asdasd; ".repeat(10)
  // },
  // {
  //   username: "doge",
  //     message: "sadjkl;kjfwaf;asdasd; ".repeat(10)
  // },
  // {
  //   username: "doge",
  //     message: "sadjkl;kjfwaf;asdasd; ".repeat(10)
  // },
  // {
  //   username: "doge",
  //     message: "sadjkl;kjfwaf;asdasd; ".repeat(10)
  // },
]

export const Chat = ({ messages, onSend }) => {
  const boxRef = useRef();
  return <div className="chat-container">
    <div className="chat-list">
      {
        fakeMessages.map(msg => (
          <div className="chat-message">
            <div className="chat-wrapper">
              <div className="message-sender"> {msg.username}</div>
              <div className="message-text"> {msg.message}</div>
            </div>
          </div>
        ))
      }
      {
        <div className="chat-message self">
          <div className="chat-wrapper">
            <div className="message-sender"> Me </div>
            <div className="message-text"> Hello world </div>
          </div>
        </div>
      }
    </div>
    <div className="chat-controls">
      <input ref={boxRef}></input>
      <button onClick={() => {
        onSend(boxRef.current.value);
      }}> Chat </button>
    </div>
  </div>
}