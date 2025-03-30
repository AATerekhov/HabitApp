import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';

const DelayHabitOptions = ({ initialItem, onChangeUpdateItem }) => {    
  const [currentItem, setCurrentItem] = useState(initialItem);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const updatedItem = { ...currentItem, [name]: newValue };
    
    onChangeUpdateItem(updatedItem);
  };

  useEffect(() => {
    setCurrentItem(initialItem);     
  }, [initialItem]);

  return (
    <div className='card'>
      <a className='row'>Delay settings:</a>
        <div className='row-button input-group'>
            <div>
                <input 
                    type="checkbox" 
                    id='isAfterATime'
                    name="isAfterATime"
                    checked={currentItem.isAfterATime}
                    onChange={handleInputChange}
                />
                <label className="label-inline" for='isAfterATime'>Is after time</label>   
            </div>
        </div>
        {currentItem.isAfterATime && (<div className='row-button input-group'>
          <input 
            type="number"
            name="afterTime"
            value={currentItem.afterTime}
            onChange={handleInputChange}
            placeholder="After Time"
            className="input"
            />
        </div>)}
        <div className='row-button input-group'>
            <div>
                <input 
                    type="checkbox" 
                    id='isEndless'
                    name="isEndless"
                    checked={currentItem.isEndless}
                    onChange={handleInputChange}
                />
                <label className="label-inline" for='isEndless'>Is Endless</label>   
            </div>
        </div>
        {currentItem.isEndless && (<div className='row-button input-group'>
          <input 
            type="number"
            name="durationTime"
            value={currentItem.durationTime}
            onChange={handleInputChange}
            placeholder="Duration Time"
            className="input"
            />
        </div>)}
    </div>
  );
};

export default DelayHabitOptions;