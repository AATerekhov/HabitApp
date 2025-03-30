import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as apiService from '../services/coinsService';
import * as habitsApiService from '../services/habitsService';
import CoinsCreateCard from './views/coinscards/CoinsCreateCard';
import CoinsTable from './tables/CoinsTable';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './coins.css';

function AdminCoins (){
  const [items, setItems] = useState([]); //Доступные habits для добавления в coins
  const [coins, setCoins] = useState([]);

  const selectRoom = useSelector(store => store.admin.caseHabits);  
  const person = useSelector(store => store.admin.person);  
  const isAdmin = useSelector(store => store.admin.isAdmin);  
 
  
  const deleteItem = async (id) => {

    async function Delete() {
        return await apiService.deleteCoinFromApi(id);  
      }

    async function getRoomsHabits() {
      if (isAdmin){
        const habits = await habitsApiService.getDetailHabitsRoomFromApi(selectRoom.id)
        setItems(habits)
      }      
    }  

    let result = await Delete();
    if(result === true){
        setCoins(coins.filter(item => item.id !== id));
        getRoomsHabits();
    }
  };


  const handleAddItemChange = async (habitId, cost) => {
    async function AddCase() {
        const element = await apiService.addCoinFromApi({
          personId: person.id, 
          roomId: selectRoom.id, 
          habitId: habitId,
          costOfWinning: cost
        });     
        setCoins([...coins, element]);
      }
          
    await AddCase();
    setItems(items.filter(item => item.id !== habitId));
  };
  

    const groupedHabits = items.reduce((acc, item) => {
        (acc[item.ownerId] = acc[item.ownerId] || []).push(item);
        return acc;
      }, {});

  useEffect(() => {
    async function getRoomsHabits() {
      if (isAdmin){
        const habits = await habitsApiService.getDetailHabitsRoomFromApi(selectRoom.id)
        setItems(habits)
      }      
    }   
    async function getRoomsCoins() {
        const elements = await apiService.getRoomCoinsFromApi(selectRoom.id)
        setCoins(elements)
    }
    getRoomsHabits();
    getRoomsCoins();
  }, [])

  return (
    <div className="container">
        <h2>Room's Coins "{selectRoom?selectRoom.name:''}" 💰</h2>  
        {isAdmin && (<div className="card-grid">
            {Object.keys(groupedHabits).map(ownerId => (
            <div key={ownerId} className="column">
              {groupedHabits[ownerId].map(habit => (
                <CoinsCreateCard initialElement={habit} onChangeAddCoins={handleAddItemChange}/>  
              ))}
            </div>
            ))}
        </div>)}           
        <CoinsTable initialItems={coins} onChangeDeleteItem={deleteItem}/>      
    </div>      
  )  
}

export default AdminCoins;