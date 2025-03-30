import React, { useState, useEffect } from 'react'

import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../cards.css';
import CardContent from './CardContent';

const HabitContent = ({ initialElement }) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);  
  
  useEffect(() => {
    setCurrentItem(initialElement);  
  }, [initialElement]);

  return (
    <CardContent initialElement={currentItem.card} initialTitle={{description: currentItem.description}}/>
  );
};

export default HabitContent;