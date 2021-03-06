import React, { useState } from 'react';
import './App.css';
import {Login} from './components/login';
import {Room} from './components/room';
import * as request from 'superagent';
import { apiRoot } from './config';

const App = () => {
  const [roomData, setRoomData] = useState(null);
  const joinRoom = ({username, password, roomId}) => {
    setRoomData({username, password, roomId});
  }
  const createRoom = ({username, password, roomName}) => {
    request.post(`http://${apiRoot}`).send({
      username, password, roomName
    })
    .then(_res => {
      const res = JSON.parse(_res.text);
      let {roomId} = res;
      console.log(res);
      joinRoom({username, password, roomId});
    })
  }

  const backToLogin = () => {
    setRoomData(null);
  }
  
  return <div className="container">
    {
      !roomData && <Login onCreate={createRoom} onJoin={joinRoom}/>
    }
    {
      roomData && <Room {...roomData} onError={backToLogin}/>
    }
  </div>
}

export default App;
