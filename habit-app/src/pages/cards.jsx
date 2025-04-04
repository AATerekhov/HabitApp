import React, { useState, useEffect } from 'react'
import * as apiService from '../services/cardsService'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cards.css';
import CardCreate from './creaters/CardCreate';
import CardUpdate from './updates/CardUpdate';
import CardTable from './tables/CardTable';
import CardView from '../pages/views/CardView';

function Cards() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(0);
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
    setIsEditing(0);
  };
  
  const editItem = async (item) => {
    try {      
      let detailItem = await apiService.getCardFoIdFromApi(item.id);
      
      setIsEditing(1);
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
    setIsEditing(0);
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
  
      const showFullItem = async (cardId) => {
        try {      
          
          let detailItem = await apiService.getCardFoIdFromApi(cardId);      
          setCurrentItem(detailItem);
          setIsEditing(2);
        } catch (error) {
          return;
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
      { (isEditing === 0) && (<CardCreate onChangeAddItem={handleAddItemChange}/>) }   
      { (isEditing === 1) && (<CardUpdate initialElement={currentItem} onChangeUpdateItem={handleUpdateItemChange} onCansel={handleCansel}/>) }
      { (isEditing === 2) && (<div className='shelf'> <CardView initialElement={currentItem} initialTitle={{name:currentItem.name, description: currentItem.description}}/></div>) } 
      <CardTable  initialItems={items} onChangeEditItem={editItem} onChangeDeleteItem={deleteItem} onChengeShowItem={showFullItem} onChengeCansel={handleCansel}/>
    </div>
  )  
}

export default Cards