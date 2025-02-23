import React, { useState, useEffect } from 'react'
import { signoutRedirect } from '../services/userService'
import * as apiService from '../services/apiService'
import { prettifyJson } from '../utils/jsonUtils'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './rooms.css';

function Rooms() {

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = () => {
    if (!currentItem.name) return;
    setItems([...items, { id: Date.now(), name: currentItem.name }]);
    setCurrentItem({ id: null, name: '' });
  };

  const editItem = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };

  const updateItem = () => {
    setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
    setCurrentItem({ id: null, name: '' });
    setIsEditing(false);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  useEffect(() => {
    async function getRooms() {
        const rooms = await apiService.getDoughnutsFromApi()
        setItems(rooms)
      }

    getRooms();
  }, [])

  return (
    <div className="container">
      <h2>Your rooms for administration</h2>
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
          <button onClick={updateItem} className="button">Update Item</button>
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
                 <td>{item.name}</td>
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

export default Rooms