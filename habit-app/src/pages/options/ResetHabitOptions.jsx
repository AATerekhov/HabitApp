import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';
import  ElementOptions  from './ElementOptions';
import { ResetIntervalEnum, ResetIntervalLabels } from '../enums/resetIntervalEnum';
import { WeekDaysEnum, WeekDaysLabels } from '../enums/WeekDays';

const ResetHabitOptions = ({ initialItem, onChangeUpdateItem }) => {    
  const [currentItem, setCurrentItem] = useState(initialItem);   
  const [selectedFlags, setSelectedFlags] = useState(initialItem.options);
  const [weekDays, setWeekDays] = useState(initialItem.weekDays);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const updatedItem = { ...currentItem, [name]: newValue };
    
    onChangeUpdateItem(updatedItem);
  };
  
  const handleFlagsChange = (newFlags) => {
    const updatedItem = { ...currentItem, options: newFlags };    
    onChangeUpdateItem(updatedItem);
  };
  const handleWeekDaysChange = (newFlags) => {
    const updatedItem = { ...currentItem, weekDays: newFlags };    
    onChangeUpdateItem(updatedItem);
  };

  useEffect(() => {
    setCurrentItem(initialItem);     
    setSelectedFlags(initialItem.options);
    setWeekDays(initialItem.weekDays);
  }, [initialItem]);

  return (
    <div>
        <a className='row'>Reset settings:</a>
        <div className='shelf'>
            <ElementOptions initialFlags={selectedFlags} onFlagsChange={handleFlagsChange} flagsEnum={ResetIntervalEnum} flagsLabels={ResetIntervalLabels} title='Reset Interval:'/>
            <div className='card'>
                <a>Time the day</a>
                <div className='row-button input-group'>
                  <input 
                    type="number"
                    name="timeTheDay"
                    value={currentItem.timeTheDay}
                    onChange={handleInputChange}
                    placeholder="Time the day"
                    className="input"
                    />
                </div>
                <a>Number day of the month</a>
                <div className='row-button input-group'>
                  <input 
                    type="number"
                    name="numberDayOfTheMonth"
                    value={currentItem.numberDayOfTheMonth}
                    onChange={handleInputChange}
                    placeholder="Number day of the month"
                    className="input"
                    />
                </div>               
            </div>    
            <ElementOptions initialFlags={weekDays} onFlagsChange={handleWeekDaysChange} flagsEnum={WeekDaysEnum} flagsLabels={WeekDaysLabels} title='Week Days:'/>
        </div>
    </div>
    
  );
};

export default ResetHabitOptions;