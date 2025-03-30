import React, { useState, useEffect } from 'react'
import { HabitFlagsEnum, HabitFlagsLabels } from '../enums/habitFlagsEnum';
import  ElementOptions  from '../options/ElementOptions';
import DelayHabitOptions from '../options/DelayHabitOptions';
import ResetHabitOptions from '../options/ResetHabitOptions';
import RepetitionHabitOptions from '../options/RepetitionHabitOptions';

const HabitUpdate = ({ initialElement, onChangeUpdateItem , onCansel}) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);
  const [selectedFlags, setSelectedFlags] = useState(initialElement.options);
  
  const isChecked = (flag) => (selectedFlags & flag) !== 0;

  const handleFlagsChange = (newFlags) => {
    setSelectedFlags(newFlags);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const handleUpdateDelayChange = (updateDelay) => {
    setCurrentItem({ ...currentItem, delay: updateDelay});
  };
  const handleUpdateResetChange = (updateReset) => {
    setCurrentItem({ ...currentItem, timeResetInterval: updateReset});
  };
  const handleUpdateRepetitionChange = (updateRepetition) => {
    setCurrentItem({ ...currentItem, repetition: updateRepetition});
  };

  const updateItem = async () => {    
    let updateItem = currentItem;
    updateItem.options = selectedFlags;
    await onChangeUpdateItem(updateItem);
    setCurrentItem({ id: null, name: '', description: '' });
  };

  useEffect(() => {
    setCurrentItem(initialElement);     
    setSelectedFlags(initialElement.options);
  }, [initialElement]);

  return (
    <div className="container">   
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
          <button className='button button-outline' onClick={() => onCansel()}><i className="fa fa-eye-slash fa-lg"></i></button>
          <button onClick={async () => await updateItem()} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>           
        </div>       
        <div className='shelf'>            
            <ElementOptions initialFlags={selectedFlags} onFlagsChange={handleFlagsChange} flagsEnum={HabitFlagsEnum} flagsLabels={HabitFlagsLabels}/>   
            {isChecked(HabitFlagsEnum.FLAG_ONE) && (<DelayHabitOptions initialItem={currentItem.delay} onChangeUpdateItem={handleUpdateDelayChange}/>)}
            {isChecked(HabitFlagsEnum.FLAG_THREE) && (<RepetitionHabitOptions initialItem={currentItem.repetition} onChangeUpdateItem={handleUpdateRepetitionChange}/>)}
        </div>        
        {isChecked(HabitFlagsEnum.FLAG_TWO) && (<ResetHabitOptions initialItem={currentItem.timeResetInterval} onChangeUpdateItem={handleUpdateResetChange}/>)}
    </div> 
  );
};

export default HabitUpdate;