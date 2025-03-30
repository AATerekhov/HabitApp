import React, { useState } from 'react';

const CardCreate = ({onChangeAddItem }) => {    
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = async () => {
      if (!currentItem.name) return;            
      await onChangeAddItem(currentItem);
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
      <button onClick={async () => await addItem()} className="button"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
    </div> 
  );
};

export default CardCreate;