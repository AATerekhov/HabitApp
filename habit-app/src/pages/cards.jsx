import React, { useState, useEffect } from 'react'
import * as apiService from '../services/cardsService'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cards.css';
import CardCreate from './creaters/CardCreate';
import CardUpdate from './updates/CardUpdate';
import CardTable from './tables/CardTable';

function Cards() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleAddItemChange = async (newCard) => {
    if (!newCard.name) return;
    async function AddCase() {
        const card = await apiService.addCardFromApi({name: newCard.name, description: newCard.description});     
        setItems([...items, card]);
      }
          
    await AddCase();
  };

  const handleCansel = () => {
    setIsEditing(false);
  };
  
  const editItem = async (item) => {
    try {      
      let detailItem = await apiService.getCardFoIdFromApi(item.id);
      
      setIsEditing(true);
      setCurrentItem(detailItem);
    } catch (error) {
      return;
    }   
  };  

  const handleUpdateItemChange= async (item) => {
    async function UpdateCase(updateItem) {

      return await apiService.updateCardFromApi(updateItem);  
    }
    let result = await UpdateCase(item);
    if(result){
        setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        setCurrentItem(null);
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
      {!isEditing && (<CardCreate onChangeAddItem={handleAddItemChange}/>) }   
      {isEditing && (<CardUpdate initialElement={currentItem} onChangeUpdateItem={handleUpdateItemChange} onCansel={handleCansel}/>) } 
      <CardTable  initialItems={items} onChangeEditItem={editItem} onChangeDeleteItem={deleteItem}/>
    </div>
  )  
}

export default Cards