import React, { useState, useEffect } from 'react'
import '../view.css';

const OwnerContext = ({ initialElement}) => {   
  const getOwner = (item) => {
    return (item.ownerId === item.room.managerId)?item.room.name:item.owner.name
  };

  const [ownerName, setOwnerName] = useState(getOwner(initialElement));  

  useEffect(() => { 
    setOwnerName(getOwner(initialElement));
  }, [ initialElement]);

  return (
    <div className='standard'><small>{ownerName}</small></div>
  );
};

export default OwnerContext;