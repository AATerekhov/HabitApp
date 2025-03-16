import React, { useState, useEffect } from 'react'
import * as apiService from '../services/cardsService'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './cards.css';
import  StringTable  from '../components/stringTable';
// import { useNavigate } from 'react-router-dom';

const FlagsEnum = {
  OPTION_ONE: 1 << 0, // 1
  OPTION_TWO: 1 << 1, // 2
  OPTION_THREE: 1 << 2, // 4
  OPTION_FOUR: 1 << 3, // 8
  OPTION_FIVE: 1 << 4, // 16
  OPTION_SIX: 1 << 5, // 32
  OPTION_SEVEN: 1 << 6, // 64
  OPTION_EGHT: 1 << 7, // 128
};

function Cards() {
//   const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFlags, setSelectedFlags] = useState(0);
  const [showStatus, setShowStatus] = useState(0);  
  const [status, setStatus] = useState(['act 1', 'act 2']);
  const [tags, setTags] = useState(['act 1', 'act 2']);
  const [checkElements, setCheckElements] = useState(['act 1', 'act 2']);

  const handleUpdateStatus = (updatedStrings) => {
    setStatus(updatedStrings);
  };
  const handleUpdateTags = (updatedStrings) => {
    setTags(updatedStrings);
  };
  const handleUpdateCheckElements = (updatedStrings) => {
    setCheckElements(updatedStrings);
  };
    
  const toggleShowStatus = (number) => {
    setShowStatus(number);
  };

  const handleCheckboxChange = (flag) => {
    setSelectedFlags((prevFlags) => prevFlags ^ flag);
  };
  
  const isChecked = (flag) => (selectedFlags & flag) !== 0;

  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, 
      templateValues: {
        ...currentItem.templateValues,
        [name]: value,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const addItem = async () => {
    if (!currentItem.name) return;
    async function AddCase() {
        const card = await apiService.addCardFromApi({name: currentItem.name, description: currentItem.description});     
        setItems([...items, card]);
      }
          
    await AddCase();
    setCurrentItem({ id: null, name: '', description: '' });
  };

  
  const editItem = async (item) => {
    try {      
      let detailItem = await apiService.getCardFoIdFromApi(item.id);
      setStatus(detailItem.status);
      setCheckElements(detailItem.titleCheckElements);
      setTags(detailItem.tags);
      setSelectedFlags(detailItem.options);
      
      setIsEditing(true);
      setCurrentItem(detailItem);
    } catch (error) {
      return;
    }   
  };  

  const updateItem = async () => {
    async function UpdateCase() {
      let updateItem = currentItem;
      updateItem.options = selectedFlags;
      updateItem.status = status;
      updateItem.tags = tags;
      updateItem.titleCheckElements = checkElements;

      return await apiService.updateCardFromApi(updateItem);  
    }
    let result = await UpdateCase();
    if(result){
        setItems(items.map(item => (item.id === currentItem.id ? currentItem : item)));
        setCurrentItem({ id: null, name: '', description: '' });
    }
    setIsEditing(false);
    setShowStatus(0);
  };

  const deleteItem = async (id) => {

    async function DeleteCase() {
        return await apiService.deleteCardFromApi(id);  
      }

    let result = await DeleteCase();
    if(result === true){
        setItems(items.filter(item => item.id !== id));
    }
  };
  

  useEffect(() => {
    async function getCards() {
        const cards = await apiService.getCardsFromApi()
        setItems(cards)
      }

      getCards();
  }, [])

  return (
    <div className="container">
      <h2>Cards for administration 🎴🃏</h2>
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
          {isEditing ? (
            <button onClick={async () => await updateItem()} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>
          ) : (
            <button onClick={async () => await addItem()} className="button"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
          )} 
        </div> 
        {isEditing && (
          <div className='shelf'>
            <div >
              <h4>Select options:</h4>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_ONE"
                  checked={isChecked(FlagsEnum.OPTION_ONE)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_ONE)}
                />
                <label class="label-inline" for="OPTION_ONE">The presence of a changing status</label>                
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_TWO"
                  checked={isChecked(FlagsEnum.OPTION_TWO)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_TWO)}
                />
                <label class="label-inline" for="OPTION_TWO">Quantitative indicator</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_THREE"
                  checked={isChecked(FlagsEnum.OPTION_THREE)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_THREE)}
                />
                <label class="label-inline" for="OPTION_THREE">Check boxes</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_FOUR"
                  checked={isChecked(FlagsEnum.OPTION_FOUR)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_FOUR)}
                />
                <label class="label-inline" for="OPTION_FOUR">The need for a report, text, comment</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_FIVE"
                  checked={isChecked(FlagsEnum.OPTION_FIVE)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_FIVE)}
                />
                <label class="label-inline" for="OPTION_FIVE">Embedded tags</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_SIX"
                  checked={isChecked(FlagsEnum.OPTION_SIX)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_SIX)}
                />
                <label class="label-inline" for="OPTION_SIX">Positive notation</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_SEVEN"
                  checked={isChecked(FlagsEnum.OPTION_SEVEN)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_SEVEN)}
                />
                <label class="label-inline" for="OPTION_SEVEN">Negative notation</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="OPTION_EGHT"
                  checked={isChecked(FlagsEnum.OPTION_EGHT)}
                  onChange={() => handleCheckboxChange(FlagsEnum.OPTION_EGHT)}
                />
                <label class="label-inline" for="OPTION_EGHT">File, Photo, Document</label>
              </div>
            </div>
            <div className='card'>
              <h5>Field Headers:</h5>
              {isChecked(FlagsEnum.OPTION_ONE) && (
              <div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleStatus"
                  value={currentItem.templateValues.titleStatus}
                  onChange={handleInputFieldChange}
                  placeholder="Title Status"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_ONE)}
                /> 
                {(showStatus === 1) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(1)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(FlagsEnum.OPTION_TWO) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleValue"
                  value={currentItem.templateValues.titleValue}
                  onChange={handleInputFieldChange}
                  placeholder="Title Value"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_TWO)}
                /> 
              </div>)}
              {isChecked(FlagsEnum.OPTION_THREE) && (
              <div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleCheck"
                  value={currentItem.templateValues.titleCheck}
                  onChange={handleInputFieldChange}
                  placeholder="Title Check"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_THREE)}
                /> 
                {(showStatus === 2) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(2)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(FlagsEnum.OPTION_FOUR) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleReportField"
                  value={currentItem.templateValues.titleReportField}
                  onChange={handleInputFieldChange}
                  placeholder="Title Report Field"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_FOUR)}
                /> 
              </div>)}
              {isChecked(FlagsEnum.OPTION_FIVE) && (
              <div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleTags"
                  value={currentItem.templateValues.titleTags}
                  onChange={handleInputFieldChange}
                  placeholder="Title Tags"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_FIVE)}
                /> 
                {(showStatus === 3) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(3)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(FlagsEnum.OPTION_SIX) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titlePositive"
                  value={currentItem.templateValues.titlePositive}
                  onChange={handleInputFieldChange}
                  placeholder="Title Positive"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_SIX)}
                /> 
              </div>)}
              {isChecked(FlagsEnum.OPTION_SEVEN) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleNegative"
                  value={currentItem.templateValues.titleNegative}
                  onChange={handleInputFieldChange}
                  placeholder="Title Negative"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_SEVEN)}
                /> 
              </div>)}
              {isChecked(FlagsEnum.OPTION_EGHT) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleFileReceiver"
                  value={currentItem.templateValues.titleFileReceiver}
                  onChange={handleInputFieldChange}
                  placeholder="Title File Receiver"
                  className="input"
                  hidden={!isChecked(FlagsEnum.OPTION_EGHT)}
                /> 
              </div>)}              
            </div>
            {(showStatus !== 0) && (
              <div>
                {(isChecked(FlagsEnum.OPTION_ONE) && (showStatus === 1)) && (
                  <StringTable initialStrings={status} onUpdateStrings={handleUpdateStatus}/>              
                )}
                {(isChecked(FlagsEnum.OPTION_THREE) && (showStatus === 2)) && (
                    <StringTable initialStrings={checkElements} onUpdateStrings={handleUpdateCheckElements}/>              
                )}
                {(isChecked(FlagsEnum.OPTION_FIVE) && (showStatus === 3)) && (
                    <StringTable initialStrings={tags} onUpdateStrings={handleUpdateTags}/>              
                )}
            </div>)}
            
          </div>          
        )}
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
    </div>
  )  
}

export default Cards