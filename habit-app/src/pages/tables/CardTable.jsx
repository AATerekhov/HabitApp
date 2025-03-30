import React, { useState, useEffect } from 'react';

const CardTable = ({  initialItems, onChangeEditItem, onChangeDeleteItem }) => {    
  const [items, setItems] = useState(initialItems);

  const editItem = async (item) => {
    await onChangeEditItem(item);
  };

  const deleteItem = async (itemId) => {
    await onChangeDeleteItem(itemId);
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
           <tr key={item.id}>
             <td> 
               {item.name}                
             </td>
             <td> 
               {item.description}                
             </td>
             <td>
             <div className="button-group">
               <button className='button button-outline' onClick={async () => await editItem(item)}><i className="fa fa-pencil fa-lg"></i></button>
               <button className='button button-outline' onClick={async () => await deleteItem(item.id)}> <i className="fas fa-trash fa-lg"></i></button>
             </div>
             </td>
           </tr>
        ))}
      </tbody>
    </table> 
  );
};

export default CardTable;