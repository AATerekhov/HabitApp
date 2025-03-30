import React, { useState, useEffect } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';
import CardView from './CardView';

const HabitCardView = ({ initialElement }) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);  
  
  useEffect(() => {
    setCurrentItem(initialElement);  
  }, [initialElement]);

  return (
    <CardView initialElement={currentItem.card} initialTitle={{name:currentItem.name, description: currentItem.description}}/>
  );
};

export default HabitCardView;