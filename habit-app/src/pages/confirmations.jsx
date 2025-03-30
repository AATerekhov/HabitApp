import React, { useState, useEffect } from 'react'
import * as participantsApiService from '../services/participantsService'
import * as caseApiService from '../services/casesService'
import * as habitApiService from '../services/habitsService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storePerson, storeRoom, storeAdmin, storeCaseHabits, storeRoomError } from '../reducers/adminSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './administration.css';

const Confirmations = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [updateParticipant, setUpdateParticipant] = useState({id: null, name: ''});

    const updateItem = (id) => {
        async function UpdateParticipant() {
            const participant = await participantsApiService.updateParticipantFromApi(id);  
            setUpdateParticipant(participant)
        }

        UpdateParticipant();
        
    };

     const showDetail = async (item) => {


        try{  
          let room = await  caseApiService.getRoomFoIdFromApi(item.caseId);
          dispatch(storeRoom(room));
          dispatch(storePerson(item));
          dispatch(storeAdmin(false));
          dispatch(storeCaseHabits(room))
          
        } catch {         
          dispatch(storeRoomError(true));
        }
        navigate(`/rooms/${item.caseId}/habits`);
      };

      useEffect(() => {
        if(updateParticipant.id){
            setItems(items.map(item => (item.id === updateParticipant.id ? updateParticipant : item)));
        }
      }, [updateParticipant])

      useEffect(() => {
        async function getItems() {
            const participants = await participantsApiService.getParticipantsFromApi()
            setItems(participants)
          }
    
          getItems();
      }, [])

    return (
        <div className="container"> 
            <h2>Your confirmations 🗿</h2>
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>status</th>
                  <th>RoomName</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No participant added yet
                  </td>
                </tr>
           ) : (items.map(item => (
                <tr key={item.id}>
                  <td>   
                    {item.isConfirm ? (<i className="fa fa-check-circle fa-lg"></i>) : (<i className="fa fa-exclamation-circle fa-lg"></i>)}             
                  </td>
                  <td>    
                    {item.case.name}                
                  </td>
                  <td>
                  <div className="button-group">
                    {(!item.isConfirm) && (<button className='button button-outline' onClick={() => updateItem(item.id)}> <i className="fa fa-check fa-lg"></i></button>) }
                    {item.isConfirm && (<button className='button button-outline' onClick={async () => await showDetail(item)}><i className="fa fa-user fa-lg"></i></button>)}
                  </div>
                  </td>
                </tr>
                )))}
              </tbody>
            </table>
        </div>
    )
}

export default Confirmations