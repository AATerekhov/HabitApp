import React from 'react'
import { useSelector } from 'react-redux';

function AdminRewords (){    
  const selectRoom = useSelector(state => state.admin.room);

    return (
        <div className="container">
          <h2>Room's Rewords "{selectRoom?selectRoom.name:''}" 🏅</h2> 
        </div>
      )  
}

export default AdminRewords;