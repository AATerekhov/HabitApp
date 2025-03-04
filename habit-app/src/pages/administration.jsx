import React, { useState, useEffect } from 'react'
import * as apiService from '../services/casesService'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './administration.css';
import { useNavigate } from 'react-router-dom';

function Administration() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = () => {
    if (!currentItem.name) return;
    async function AddCase() {
        const room = await apiService.addRoomFromApi(currentItem.name);     
        setItems([...items, room]);
      }
          
    AddCase();
    setCurrentItem({ id: null, name: '' });
  };

  const editItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };  

  const updateItem = () => {
    async function UpdateCase() {
        return await apiService.updateRoomFromApi(currentItem.name, currentItem.id);  
    }
    let result = UpdateCase();
    if(result){
        setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        setCurrentItem({ id: null, name: '' });
    }
    setIsEditing(false);
  };

  const deleteItem = (id) => {

    async function DeleteCase() {
        return await apiService.deleteRoomFromApi(id);  
      }

    let result = DeleteCase();
    if(result){
        setItems(items.filter(item => item.id !== id));
    }
  };
  
  const showDetail = (id) => {
    navigate(`/rooms/${id}`);
  };

  useEffect(() => {
    async function getRooms() {
        const rooms = await apiService.getAllRoomsFromApi()
        setItems(rooms)
      }

    getRooms();
  }, [])

  return (
    <div className="container">
      <h2>Your rooms for administration 👋</h2>
      <div className="input-group">
        <input
          type="text"
          name="name"
          value={currentItem.name}
          onChange={handleInputChange}
          placeholder="Enter item name"
          className="input"
        />
        {isEditing ? (
          <button onClick={updateItem} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>
        ) : (
          <button onClick={addItem} className="button"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
        )}
      </div>

      <table className="u-full-width">
         <thead>
           <tr>
             <th>Name</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
            {items.map(item => (
               <tr key={item.id}>
                 <td>
                   <button className='button button-clear' onClick={() => showDetail(item.id)}><i className="fa fa-users fa-2x"></i></button>    
                   {item.name}                
                 </td>
                 <td>
                 <div className="button-group">
                   <button className='button button-outline' onClick={() => editItem(item)}><i className="fa fa-pencil fa-lg"></i></button>
                   <button className='button button-outline' onClick={() => deleteItem(item.id)}> <i className="fas fa-trash fa-lg"></i></button>
                 </div>
                 </td>
               </tr>
            ))}
         </tbody>
        </table>
    </div>
  )  
}

export default Administration