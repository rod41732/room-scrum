import React, { useRef, useState } from 'react';
import { MemberList } from './memberList';
import { Control } from './control';
import { Chat } from './chat';
import "./room.scss"
import { apiRoot } from '../config';


export const Room = ({username, password, roomId, onError }) => {
  const ws = useRef();
  const [room, setRoom] = useState(null);
  const [hasReveal, setReveal] = useState(false);

  const onMessage = (evt) => {
    const message = evt.data;
    const {event, data} = JSON.parse(message);
    console.log("message", {event, data});
    switch (event) {
      case 'error':
        onError();
        alert(data);
        break;
      case 'info':
        setRoom(data);
        console.log('set room', data);
        break;
      case 'join':
        const {username: user} = data;
        setRoom({
          ...room,
          users: [...room.users, {
            username: user,
          }]
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
        setReveal(true);
        setRoom({
          ...room,
          users: data,
        });
        break;
      case 'system': // system message
          setRoom({
            ...room,
            chat: [...room.chat, {
              username: "system",
              message: data,
            }],
          });
          break;
      case 'nextRound':
        setReveal(false);
        setRoom({
          ...room,
          users: data,
        });
        break;
    }
  };

  if (!ws.current) {
    console.log('API is at', apiRoot);
    const conn = new WebSocket(`ws://${apiRoot}/room?username=${username}&password=${password}&roomId=${roomId}`);
    ws.current = conn;
  }
  const conn = ws.current;
  conn.onerror = conn.onclose = onError;
  conn.onmessage = onMessage;

  const reveal = () => {
    conn.send(JSON.stringify({
      type: 'reveal'
    }));
  }
  const nextRound = () => {
    conn.send(JSON.stringify({
      type: 'nextRound'
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
      <div> Room ID: {roomId} </div>
      <MemberList members={users} roomName={room.name}/>
      <Control onVote={onVote} onReveal={hasReveal ? nextRound: reveal} hasReveal={hasReveal}/>
      <Chat messages={chat} onSend={onSend} myUsername={username}/>
      {/* <p>{JSON.stringify(room)}</p> */}
    </div>
  } else {
    return <div> Loading room </div>
  }

}