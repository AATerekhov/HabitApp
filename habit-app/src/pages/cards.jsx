import React, { useState, useEffect } from 'react'
import * as apiService from '../services/cardsService'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './administration.css';
// import { useNavigate } from 'react-router-dom';

const FlagsEnum = {
  OPTION_ONE: 1 << 0, // 1
  OPTION_TWO: 1 << 1, // 2
  OPTION_THREE: 1 << 2, // 4
  OPTION_FOUR: 1 << 3, // 8
  OPTION_FIVE: 1 << 4, // 16
  OPTION_SIX: 1 << 5, // 32
  OPTION_SEVEN: 1 << 6, // 64
  OPTION_EGHT: 1 << 7, // 128
};

function Cards() {
//   const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFlags, setSelectedFlags] = useState(0);
    
  const handleCheckboxChange = (flag) => {
    setSelectedFlags((prevFlags) => prevFlags ^ flag);
  };
  
  const isChecked = (flag) => (selectedFlags & flag) !== 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = async () => {
    if (!currentItem.name) return;
    async function AddCase() {
        const card = await apiService.addCardFromApi({name: currentItem.name, description: currentItem.description});     
        setItems([...items, card]);
      }
          
    await AddCase();
    setCurrentItem({ id: null, name: '', description: '' });
  };

  const editItem = async (item) => {
    try {      
      let detailItem = await apiService.getCardFoIdFromApi(item.id);
      setSelectedFlags(detailItem.options);
      setIsEditing(true);
      setCurrentItem(detailItem);
    } catch (error) {
      return;
    }   
  };  

  const updateItem = () => {
    async function UpdateCase() {
        return await apiService.updateRoomFromApi(currentItem.name, currentItem.id);  
    }
    let result = UpdateCase();
    if(result){
        setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        setCurrentItem({ id: null, name: '', description: '' });
    }
    setIsEditing(false);
  };

  const deleteItem = async (id) => {

    async function DeleteCase() {
        return await apiService.deleteCardFromApi(id);  
      }

    let result = await DeleteCase();
    if(result === true){
        setItems(items.filter(item => item.id !== id));
    }
  };
  

  useEffect(() => {
    async function getCards() {
        const cards = await apiService.getCardsFromApi()
        setItems(cards)
      }

      getCards();
  }, [])

  return (
    <div className="container">
      <h2>Cards for administration 🎴🃏</h2>
        <div className="input-group">      
          <input
            type="text"
            name="name"
            value={currentItem.name}
            onChange={handleInputChange}
            placeholder="Card Name"
            className="input"
          />   
          <input
            type="text"
            name="description"
            value={currentItem.description}
            onChange={handleInputChange}
            placeholder="Card Description"
            className="input"
          />
          {isEditing ? (
            <button onClick={updateItem} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>
          ) : (
            <button onClick={addItem} className="button"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
          )} 
        </div> 
        {isEditing && (
          <div>
          <h4>Выберите опции:</h4>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_ONE)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_ONE)}
            />
             The presence of a changing status
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_TWO)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_TWO)}
            />
            Quantitative indicator
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_THREE)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_THREE)}
            />
            Check boxes
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_FOUR)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_FOUR)}
            />
            The need for a report, text, comment
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_FIVE)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_FIVE)}
            />
            Embedded tags
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_SIX)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_SIX)}
            />
            Positive notation
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_SEVEN)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_SEVEN)}
            />
            Negative notation
          </label>
          <label>
            <input
              type="checkbox"
              checked={isChecked(FlagsEnum.OPTION_EGHT)}
              onChange={() => handleCheckboxChange(FlagsEnum.OPTION_EGHT)}
            />
            File, Photo, Document
          </label>
          <div>
            <h4>Выбранные флаги: {selectedFlags}</h4>
          </div>
        </div>
        )}
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
               <tr key={item.id}>
                 <td> 
                   {item.name}                
                 </td>
                 <td> 
                   {item.description}                
                 </td>
                 <td>
                 <div className="button-group">
                   <button className='button button-outline' onClick={async () => await editItem(item)}><i className="fa fa-eye fa-lg"></i></button>
                   <button className='button button-outline' onClick={async () => await deleteItem(item.id)}> <i className="fas fa-trash fa-lg"></i></button>
                 </div>
                 </td>
               </tr>
            ))}
         </tbody>
        </table> 
    </div>
  )  
}

export default Cards