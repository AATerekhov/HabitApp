import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as apiService from '../services/habitsService';
import * as cardApiService from '../services/cardsService';
import HabitCreate from './creaters/HabitCreate';
import HabitUpdate from './updates/HabitUpdate';
import CardUpdate from './updates/CardUpdate';
import HabitTable from './tables/HabitTable';
import HabitView from './views/HabitView';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cards.css';

function AdminHabits (){
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);

  const [detailCard, setDetailCard] = useState(null);
  const [fullHabit, setFullHabit] = useState(null);

  const selectRoom = useSelector(store => store.admin.caseHabits);  
  const person = useSelector(store => store.admin.person);  
  const isAdmin = useSelector(store => store.admin.isAdmin);  
  
  const handleCansel = () => {
    setIsEditing(0);
  };

  const handleUpdateItemChange = async (updateItem) => {
    async function UpdateCase(item) {
      item.roomId = selectRoom.id;
      item.personId = selectRoom.manager.id;
      return await apiService.updateHabitFromApi(item);  
    }

    let result = await UpdateCase(updateItem);
    if(result){
      setItems(items.map(item => (item.id === updateItem.id ? updateItem : item)));
      setCurrentItem(null);
    }
    setIsEditing(0);
  };

  const handleUpdateCardItemChange = async (item) => {
      async function UpdateCase(updateItem) {   
         return await cardApiService.updateCardFromApi(updateItem);  
       }
       let result = await UpdateCase(item);
       if(result){
        setDetailCard(null);
       }
       setIsEditing(0);
  };
  
  const deleteItem = async (id) => {

    async function DeleteHabit() {
        return await apiService.deleteHabitFromApi(id);  
      }

    let result = await DeleteHabit();
    if(result === true){
        setItems(items.filter(item => item.id !== id));
    }
  };
    
  const handleAddItemChange = async (item) => {
    if (!item.name) return;
    if (!item.cardId) return;
    async function AddCase(newElement) {
        const habit = await apiService.addHabitFromApi({
          name: newElement.name, 
          description: newElement.description, 
          roomId: selectRoom.id, 
          personId: person.id,
          cardId: newElement.cardId
        });     
        setItems([...items, habit]);
      }
          
    await AddCase(item);
    setCurrentItem({ id: null, name: '', description: '' });
  };

  const editItem = async (item) => {
      try {      
        let detailItem = await apiService.getHabitFoIdFromApi(item.id);        
        setCurrentItem(detailItem);
        setIsEditing(1);
      } catch (error) {
        return;
      }   
    };  

    const editCardItem = async (item) => {
      try {      
        let detailCard = await cardApiService.getCardFoIdFromApi(item.cardId);        
        setDetailCard(detailCard);
        setIsEditing(2);
      } catch (error) {
        return;
      }   
    }; 

    const showFullItem = async (habitId) => {
      try {      
        let habit = await apiService.getHabitFoIdFromApi(habitId);    
        habit.card = await cardApiService.getCardFoIdFromApi(habit.card.id);   
        setFullHabit(habit);
        setIsEditing(3);
      } catch (error) {
        return;
      }   
    };

  useEffect(() => {
    async function getRoomsHabits() {
      const habits = await apiService.getRoomsHabitsFromApi(selectRoom.id, person.id)
      setItems(habits);
    }    
    getRoomsHabits();
  }, [])

  return (
    <div className="container">
      <h2>Room's Habits "{selectRoom?selectRoom.name:''}" 📅</h2>
      { (isEditing === 0) && (<HabitCreate onChangeAddItem={handleAddItemChange}/>) }
      { (isEditing === 1) && (<HabitUpdate initialElement={currentItem} onChangeUpdateItem={handleUpdateItemChange} onCansel={handleCansel}/>) }
      { (isEditing === 2) && (<CardUpdate initialElement={detailCard} onChangeUpdateItem={handleUpdateCardItemChange} onCansel={handleCansel}/>) }
      { (isEditing === 3) && (<HabitView initialElement={fullHabit}/>) }
      <HabitTable  initialItems={items} onChangeEditItem={editItem} onChangeEditCardItem={editCardItem} onChangeDeleteItem={deleteItem} onChengeShowItem={showFullItem} onChengeCansel={handleCansel}/>
    </div>
  )
}

export default AdminHabits;