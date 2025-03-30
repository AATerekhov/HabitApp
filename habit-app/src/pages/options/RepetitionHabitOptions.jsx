import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';

const RepetitionHabitOptions = ({ initialItem, onChangeUpdateItem }) => {    
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
      <a className='row'>Repetition settings:</a>
        <div className='row-button input-group'>
          <input 
            type="number"
            name="maxCountPositive"
            value={currentItem.maxCountPositive}
            onChange={handleInputChange}
            placeholder="Max count positive"
            className="input"
            />
        </div>
        <div className='row-button input-group'>
          <input 
            type="number"
            name="maxCountNegative"
            value={currentItem.maxCountNegative}
            onChange={handleInputChange}
            placeholder="Max count negative"
            className="input"
            />
        </div>
        <div className='row-button input-group'>
            <div>
                <input 
                    type="checkbox" 
                    id='isLimit'
                    name="isLimit"
                    checked={currentItem.isLimit}
                    onChange={handleInputChange}
                />
                <label className="label-inline" for='isLimit'>Is limit</label>   
            </div>
        </div>
        {currentItem.isLimit && (<div className='row-button input-group'>
          <input 
            type="number"
            name="countLimit"
            value={currentItem.countLimit}
            onChange={handleInputChange}
            placeholder="Count limit"
            className="input"
            />
        </div>)}        
    </div>
  );
};

export default RepetitionHabitOptions;