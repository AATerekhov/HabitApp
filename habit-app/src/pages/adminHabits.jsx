import React from 'react'
import { useSelector } from 'react-redux';

function AdminHabits (){
    const selectRoom = useSelector(store => store.admin.room);
    return (
        <div className="container">
          <h2>Room's Habits "{selectRoom?selectRoom.name:''}" 📅</h2> 
        </div>
      )  
}

export default AdminHabits;