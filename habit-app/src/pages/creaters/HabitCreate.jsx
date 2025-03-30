import React, { useState } from 'react';
import SelectCard from '../../components/SelectElement';
import * as cardsApiService from '../../services/cardsService';

const HabitCreate = ({onChangeAddItem }) => {    
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', description: '' });
    const [selectedCard, setSelectedCard] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };
  
  const handleSelectChange = (item) => {
    setSelectedCard(item);
  };

  const addItem = async () => {
      if (!currentItem.name) return;      
      if (!selectedCard) return;  

      await onChangeAddItem({
          name: currentItem.name, 
          description: currentItem.description, 
          cardId: selectedCard.id
        });
      setCurrentItem({ id: null, name: '', description: '' });
    };

  return (
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
      <SelectCard onSelectChange={handleSelectChange} getElements={cardsApiService.getCardsFromApi}/>
      <button onClick={async () => await addItem()} className="button"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
    </div> 
  );
};

export default HabitCreate;