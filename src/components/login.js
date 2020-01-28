import React, { useRef, useState } from 'react';
import './login.scss'

export const Login = ({onCreate, onJoin}) => {
  const [isJoining, setJoining] = useState(false);
  const usernameInput = useRef();
  const passwordInput = useRef();
  const roomNameInput = useRef();
  const roomIdInput = useRef();

  // auto login for debug

  // const [hasLoggedIn, setLoggedIn] = useState(false);
  // if (!hasLoggedIn) {
  //   onCreate({username: '111', roomName: "doge"})
  // }
  return <div className="login">
    <div className="header">Room scrum : {isJoining ? "Join" : "Create"}</div >
    <label>Username</label>
    <input className="input" ref={usernameInput}></input>
    <label>Room password (optional)</label>
    <input className="input" type="password" ref={passwordInput}></input>    
    {
        isJoining ?
        <>
          <label>Room ID</label>
          <input className="input" ref={roomIdInput}></input>
          <button className="btn pointer" onClick={() => {
            const username = usernameInput.current.value;
            const password = passwordInput.current.value;
            const roomId = roomIdInput.current.value;
            onJoin({
              username, password, roomId,
            });
          }}> Join </button>
        </>
        :
        <>
          <label> Room Name </label>
          <input className="input" ref={roomNameInput}></input>
          <button className="btn pointer" onClick={() => {
            const username = usernameInput.current.value;
            const password = passwordInput.current.value;
            const roomName = roomNameInput.current.value;
            onCreate({
              username, password, roomName,
            });
          }}> Create </button>
        </>
    }
    <button className="link-btn pointer" onClick={() => setJoining(!isJoining)}> 
      { isJoining ? "Host new room ?" : "Join existing room ?"} 
    </button>    
  </div>
}
