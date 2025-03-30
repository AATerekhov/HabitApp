import React, { useState, useEffect } from 'react'
import { CardFlagsEnum, CardFlagsLabels } from '../enums/cardFlagsEnum';
import  StringTable  from '../../components/stringTable';
import  ElementOptions  from '../options/ElementOptions';

const CardUpdate = ({ initialElement, onChangeUpdateItem , onCansel}) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);
  const [selectedFlags, setSelectedFlags] = useState(initialElement.options);
  const [showStatus, setShowStatus] = useState(0);  
  const [status, setStatus] = useState(initialElement.status);
  const [tags, setTags] = useState(initialElement.tags);
  const [checkElements, setCheckElements] = useState(initialElement.titleCheckElements);

  const handleFlagsChange = (newFlags) => {
    setSelectedFlags(newFlags);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

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

const updateItem = async () => {    
    let updateItem = currentItem;
    updateItem.options = selectedFlags;
    updateItem.status = status;
    updateItem.tags = tags;
    updateItem.titleCheckElements = checkElements;
    await onChangeUpdateItem(updateItem);
    setCurrentItem({ id: null, name: '', description: '' });
    setShowStatus(0);
  };

  useEffect(() => {
    setCurrentItem(initialElement);     
    setStatus(initialElement.status);
    setCheckElements(initialElement.titleCheckElements);
    setTags(initialElement.tags);
    setSelectedFlags(initialElement.options);
  }, [initialElement]);

  return (
    <div className="container">   
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
          <button className='button button-outline' onClick={() => onCansel()}><i className="fa fa-eye-slash fa-lg"></i></button>
          <button onClick={async () => await updateItem()} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>           
        </div>       
        <div className='shelf'>            
            <ElementOptions initialFlags={selectedFlags} onFlagsChange={handleFlagsChange} flagsEnum={CardFlagsEnum} flagsLabels={CardFlagsLabels}/>
            <div className='card'>
              <h5>Field Headers:</h5>
              {isChecked(CardFlagsEnum.OPTION_ONE) && (<div className='row-button input-group'>
                <input type="text" name="titleStatus" value={currentItem.templateValues.titleStatus} onChange={handleInputFieldChange} placeholder="Title Status" className="input" hidden={!isChecked(CardFlagsEnum.OPTION_ONE)}/> 
                {(showStatus === 1) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(1)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_TWO) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleValue"
                  value={currentItem.templateValues.titleValue}
                  onChange={handleInputFieldChange}
                  placeholder="Title Value"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_TWO)}
                /> 
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_THREE) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleCheck"
                  value={currentItem.templateValues.titleCheck}
                  onChange={handleInputFieldChange}
                  placeholder="Title Check"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_THREE)}
                /> 
                {(showStatus === 2) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(2)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_FOUR) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleReportField"
                  value={currentItem.templateValues.titleReportField}
                  onChange={handleInputFieldChange}
                  placeholder="Title Report Field"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_FOUR)}
                /> 
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_FIVE) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleTags"
                  value={currentItem.templateValues.titleTags}
                  onChange={handleInputFieldChange}
                  placeholder="Title Tags"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_FIVE)}
                /> 
                {(showStatus === 3) ?(
                  <button className='button button-outline' onClick={() => toggleShowStatus(0)}><i className="fa fa-eye-slash fa-lg"></i></button>):(
                  <button className='button button-outline' onClick={() => toggleShowStatus(3)}><i className="fa fa-eye fa-lg"></i></button>)}
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_SIX) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titlePositive"
                  value={currentItem.templateValues.titlePositive}
                  onChange={handleInputFieldChange}
                  placeholder="Title Positive"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_SIX)}
                /> 
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_SEVEN) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleNegative"
                  value={currentItem.templateValues.titleNegative}
                  onChange={handleInputFieldChange}
                  placeholder="Title Negative"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_SEVEN)}
                /> 
              </div>)}
              {isChecked(CardFlagsEnum.OPTION_EIGHT) && (<div className='row-button input-group'>
                <input 
                  type="text"
                  name="titleFileReceiver"
                  value={currentItem.templateValues.titleFileReceiver}
                  onChange={handleInputFieldChange}
                  placeholder="Title File Receiver"
                  className="input"
                  hidden={!isChecked(CardFlagsEnum.OPTION_EIGHT)}
                /> 
              </div>)}              
            </div>
            {(showStatus !== 0) && (
              <div>
                {(isChecked(CardFlagsEnum.OPTION_ONE) && (showStatus === 1)) && (
                  <StringTable initialStrings={status} onUpdateStrings={handleUpdateStatus}/>              
                )}
                {(isChecked(CardFlagsEnum.OPTION_THREE) && (showStatus === 2)) && (
                    <StringTable initialStrings={checkElements} onUpdateStrings={handleUpdateCheckElements}/>              
                )}
                {(isChecked(CardFlagsEnum.OPTION_FIVE) && (showStatus === 3)) && (
                    <StringTable initialStrings={tags} onUpdateStrings={handleUpdateTags}/>              
                )}
            </div>)}             
        </div>
    </div> 
  );
};

export default CardUpdate;