import React from 'react';
import './memberList.scss'


const fakeMembers = [
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
  {username: "foo", vote: 112},
]

export const MemberList = ({members, roomName}) => {
  return <div className="member-list-container">
    <div className="header"> Room: {roomName} </div>
    <div className="member-list">
      {
        members.map(member => (
          <div className="member-item">
            <div className="member-name"> {member.username}</div>
            <div className="member-vote"> voted: {member.vote || "???"}</div>
          </div>
        ))
      }
    </div>
  </div>
};