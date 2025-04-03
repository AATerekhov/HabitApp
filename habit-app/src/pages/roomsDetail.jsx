import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  storeRoom } from '../reducers/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import useSignalR from '../pages/notifications/useSignalR';
import * as apiService from '../services/casesService';
import * as participantsApiService from '../services/participantsService';

function RoomDetail() {
  const userAccessToken = useSelector(store => store.auth.accessToken); 
  const { connection } = useSignalR(`${import.meta.env.VITE_API_URL}/hubs/notification`, userAccessToken);
  const selectRoom = useSelector(state => state.admin.room);
  const dispatch = useDispatch();
  const { id } = useParams();  
  const [roomPlayers, setRoomPlayers] = useState([]);  
  const [currentPlayer, setCurrentPlayer] = useState({ id: null, usermail: '', isConfirm: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlayer({ ...currentPlayer, [name]: value });
  };


  const addPlayer = () => {
    if (!currentPlayer.usermail) return;

    async function AddParticipant() {
        try {
          const participant = await participantsApiService.addParticipantFromApi(currentPlayer.usermail, id);
          connection?.invoke("SendMessage", currentPlayer.usermail , `Пригласил вас в ${selectRoom.name}`)
          setRoomPlayers([...roomPlayers, participant]);
        } catch (error) {
          return;
        } 
      }
          
      AddParticipant();
    setCurrentPlayer({ id: null, userMail: '' });
  };

 const deletePlayer = async (item) => {

    async function DeleteCase() {
        try {
          return await participantsApiService.deleteParticipantFromApi(item.id);  
        } catch (error) {
          return;
        }
      }

    let result = await DeleteCase();
    if(result === true){
      connection?.invoke("SendMessage", item.userMail , `Вас исключили из ${selectRoom.name}`)
      setRoomPlayers(roomPlayers.filter(item => item.id !== item.id));
    }
  };

  useEffect(() => {
    async function getRoom(id) {
        const room = await apiService.getRoomFoIdFromApi(id);
        dispatch(storeRoom(room));
        setRoomPlayers(room.players);
      }

    getRoom(id);
  }, [])

  return (
    <div className="container">
      <h2>Room's Participants "{selectRoom?selectRoom.name:''}" 🏇</h2>  
      <div className="input-group">
        <input
          type="email"
          name="usermail"
          value={currentPlayer.usermail}
          onChange={handleInputChange}
          placeholder="Enter item usermail"
          className="input"
        />
       <button onClick={addPlayer} className="button"><i className="fa fa-user-plus fa-lg" aria-hidden="true"></i></button>
      </div>
      <table className="u-full-width">
         <thead>
           <tr>
             <th>Name</th>
             <th>eMail</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
         {roomPlayers.length === 0 ? (
             <tr>
               <td colSpan="3" className="text-center text-muted">
                 No participant added yet
               </td>
             </tr>
            ) : (roomPlayers.map(item => (
              <tr key={item.id}>
                <td>   
                  {item.isConfirm ? (<i className="fa fa-check-circle fa-lg"></i>) : (<i className="fa fa-exclamation-circle fa-lg"></i>)}   
                  {" " + item.name}                
                </td>
                <td>    
                  {item.userMail}                
                </td>
                <td>
                <div className="button-group">
                  <button className='button button-outline' onClick={() => deletePlayer(item)}> <i className="fas fa-trash fa-lg"></i></button> 
                </div>
                </td>
              </tr>
            )))}
         </tbody>
        </table>
    </div>
  )  
}

export default RoomDetail
