import React, { useState, useEffect } from 'react'
import CoinsCreateCardMinimal from './CoinsCreateCardMinimal';
import HabitContent from '../contents/HabitContent';
import OwnerContext from '../contents/OwnerContext';
import InputCoinsContent from '../contents/InputCoinsContent';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../cards.css';

const CoinsCreateCard = ({ initialElement, onChangeAddCoins, costOfWinning = 0}) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);
  const [isMinimal, setIsMinimal] = useState(true); 
  const [cost, setCost] = useState(costOfWinning); 
  
  const isAdmin = useSelector(store => store.admin.isAdmin); 

  const toggleIsOpen = (isValue) => {
    setIsMinimal(isValue);
  };

  const handleChangeAddCoins = async (cost) => {
    await onChangeAddCoins(currentItem.id, cost);
    setIsMinimal(true);
  }

  useEffect(() => {
    setCurrentItem(initialElement);     

  }, [initialElement]);

  return (
    <div className="maincard">
      <OwnerContext initialElement={currentItem}/>
      <CoinsCreateCardMinimal initialElement={currentItem} isMinimalHandle={isMinimal} onChange={toggleIsOpen}/>
      {!isMinimal && (<HabitContent initialElement={currentItem}/>)} 
      {(!isMinimal && isAdmin) && (<hr className="divider"/>)}
      {(!isMinimal && isAdmin) && (<InputCoinsContent onChange={handleChangeAddCoins} costOfWinning={cost}/>)} 
    </div> 
  );
};

export default CoinsCreateCard;