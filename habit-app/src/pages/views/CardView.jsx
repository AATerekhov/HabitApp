import React, { useState, useEffect } from 'react'
import MinimalCard from './cardviews/MinimalCard';
import CardContent from './contents/CardContent';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../cards.css';

const CardView = ({ initialElement, initialTitle = null}) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);
  const [title, setTitle] = useState(initialTitle);  
  const [isMinimal, setIsMinimal] = useState(true); 

  const toggleIsOpen = (isValue) => {
    setIsMinimal(isValue);
  };

  useEffect(() => {
    setCurrentItem(initialElement);   
    setTitle(initialTitle);   

  }, [initialElement, initialTitle.name, initialTitle.description]);

  return (
    <div className="maincard">    
      <MinimalCard initialTitle={title?title.name:currentItem.name} onChange={toggleIsOpen}/>   
      {!isMinimal && (<CardContent initialElement={currentItem} initialTitle={title}/>)} 
    </div> 
  );
};

export default CardView;