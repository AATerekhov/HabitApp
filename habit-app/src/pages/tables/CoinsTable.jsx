import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/coinsService';
import CoinsCreateCard from '../views/coinscards/CoinsCreateCard';
import { useSelector } from 'react-redux';

const CoinsTable = ({  initialItems, onChangeDeleteItem }) => {    
  const [items, setItems] = useState(initialItems);
  const [selectItemId, setSelectItemId] = useState(null);
  const [selectDetailItem, setSelectDetailItem] = useState(null);
  
  const person = useSelector(store => store.admin.person);  
  const isAdmin = useSelector(store => store.admin.isAdmin);  

  const handleShow = async (itemId) => {
      try {      
        let detailItem = await apiService.getCoinFoIdFromApi(itemId);        
        setSelectDetailItem(detailItem);
        setSelectItemId(itemId);
      } catch (error) {
        return;
      }   
  };

  const handleCloseShow =  () => {
    setSelectItemId(null);
  };

  const deleteItem = async (itemId) => {
    await onChangeDeleteItem(itemId);
  };

    const handleEditItemChange = async (habitId, cost) => {
      let updateItem = {
        id: selectItemId, 
        personId: person.id,
        description: selectDetailItem.description,
        options: selectDetailItem.options,            
        costOfWinning: cost,
        forfeit: selectDetailItem.forfeit,
        start: selectDetailItem.start,
        falls: selectDetailItem.falls
      };
      updateItem.name = selectDetailItem.habit.name;
      async function UpdateItem(updateElement) {
        return await apiService.updateCoinFromApi(updateElement);     
      }

      let result = await UpdateItem(updateItem);
      if(result){
        setItems(items.map(item => (item.id === selectItemId ? updateItem : item)));
        setSelectDetailItem(null);
        setSelectItemId(null);
      }
    };

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>💰</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center text-muted">
              No coins added yet
            </td>
          </tr>
        ) : (items.map(item => (
            <tr key={item.id}>
              <td>
                {item.costOfWinning}
              </td>
              <td>
              {item.id !== selectItemId ?(item.name)
                :(<CoinsCreateCard initialElement={selectDetailItem.habit} onChangeAddCoins={handleEditItemChange} costOfWinning={selectDetailItem.costOfWinning}/>)}                  
              </td>
              <td>       
              <div className="button-group"> 
                {item.id !== selectItemId ?(<button className="button button-outline" onClick={async () => await handleShow(item.id)}><i className="fa fa-eye fa-lg"></i></button>)
                :(<button className="button button-outline" onClick={() => handleCloseShow()}><i className="fa fa-eye-slash fa-lg"></i></button>)}                   
                {isAdmin && (<button className='button button-outline' onClick={async () => await deleteItem(item.id)}> <i className="fas fa-trash fa-lg"></i></button>  )} 
              </div>  
              </td>
            </tr>
         )))}
      </tbody>
    </table> 
  );
};

export default CoinsTable;