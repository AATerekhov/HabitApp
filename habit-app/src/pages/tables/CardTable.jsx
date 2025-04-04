import React, { useState, useEffect } from 'react';

const CardTable = ({  initialItems, onChangeEditItem, onChangeDeleteItem, onChengeShowItem, onChengeCansel}) => {    
  const [items, setItems] = useState(initialItems);
  const [selectItemId, setSelectItemId] = useState(null);

  const editItem = async (item) => {
    setSelectItemId(null);
    await onChangeEditItem(item);
  };

  const deleteItem = async (itemId) => {
    setSelectItemId(null);
    await onChangeDeleteItem(itemId);
  };

  const handleShow = async (itemId) => {
    setSelectItemId(itemId);
    await onChengeShowItem(itemId);
  };

  const handleCloseShow =  () => {
    setSelectItemId(null);
    onChengeCansel();
  };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {items.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center text-muted">
              No cards added yet
            </td>
          </tr>
        ) : (items.map(item => (
          <tr key={item.id}>            
            <td>
                  {item.id !== selectItemId ?(<button className="button button-clear" onClick={async () => await handleShow(item.id)}><i className="fa fa-eye fa-lg"></i></button>)
                  :(<button className="button button-clear" onClick={() => handleCloseShow()}><i className="fa fa-eye-slash fa-lg"></i></button>)}
            </td>  
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
       )))}
      </tbody>
    </table> 
  );
};

export default CardTable;