import React, { useRef, useState } from 'react';
import { MemberList } from './memberList';
import { Control } from './control';
import { Chat } from './chat';
import "./room.scss"


export const Room = ({username, password, roomId }) => {
  const ws = useRef();
  const [room, setRoom] = useState(null);

  console.log('room is', room);
  const onMessage = (evt) => {
    const message = evt.data;
    const {event, data} = JSON.parse(message);
    console.log({event, data});
    switch (event) {
      case 'info':
        setRoom(data);
        console.log('set room', data);
        break;
      case 'join':
        const {username: user} = data;
        setRoom({
          ...room,
          chat: [...room.chat, {
            username: 'system',
            message: `${user} has joined the chat`,
          }],
        });
        break;
      case 'chat': 
        console.log(room);
        setRoom({
          ...room,
          chat: [...room.chat, data],
        });
        break;
      case 'reveal':
        
    }
  };

  if (!ws.current) {
    const conn = new WebSocket(`ws://localhost:3000/room?username=${username}&password=${password}&roomId=${roomId}`);
    ws.current = conn;
  }
  ws.current.onmessage = onMessage;

  const conn = ws.current;
  const onReveal = () => {
    conn.send(JSON.stringify({
      type: 'reveal'
    }));
  }

  const onVote = (value) => {
    conn.send(JSON.stringify({
      type: 'vote',
      payload: value,
    }))
  }

  const onSend = (message) => {
    conn.send(JSON.stringify({
      type: 'chat',
      payload: message,
    }))
  }

  if (room) {
    const {users, chat} = room;
    return <div className="room">
      <MemberList members={users}/>
      <Control onVote={onVote} onReveal={onReveal}/>
      <Chat messages={chat} onSend={onSend}/>
      {/* <p>{JSON.stringify(room)}</p> */}
    </div>
  } else {
    return <div> Loading room </div>
  }

}