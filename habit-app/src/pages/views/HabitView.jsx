import React, { useState, useEffect } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';
import CardView from './CardView';

const HabitView = ({ initialElement }) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);  
  
  useEffect(() => {
    setCurrentItem(initialElement);  
  }, [initialElement]);

  return (
    <div className="container">          
      <h2>Habit view "{currentItem?currentItem.name:''}" 🖼</h2> 
      <div className='shelf'>
        <CardView initialElement={currentItem.card} initialTitle={{name:currentItem.name, description: currentItem.description}}/>
      </div>      
    </div> 
  );
};

export default HabitView;