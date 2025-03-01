import React from 'react';
import { useParams } from 'react-router-dom';

function RoomDetail() {
  const { id } = useParams();

  return (
    <div>
      <p>Hello!</p>
      <p>Good detail 👋</p>      
      <p>Room, {id}</p>
    </div>
  )  
}

export default RoomDetail
