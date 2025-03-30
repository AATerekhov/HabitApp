import React, { useState, useEffect } from 'react'
import { CardFlagsEnum } from '../../enums/cardFlagsEnum';
import StatusView from '../cardviews/StatusView';
import ValueView from '../cardviews/ValueView';
import ReportFieldView from '../cardviews/ReportFieldView';
import CheckView from '../cardviews/CheckView';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../cards.css';

const CardContent = ({ initialElement, initialTitle = null}) => {    
  const [currentItem, setCurrentItem] = useState(initialElement);
  const [title, setTitle] = useState(initialTitle);  

  const isChecked = (flag) => (currentItem.options & flag) !== 0; 

  useEffect(() => {
    setCurrentItem(initialElement);   
    setTitle(initialTitle);   

  }, [initialElement, initialTitle.description]);

  return (
    <div className='standard'>
        <small>{title?title.description:currentItem.description}</small>
        {isChecked(CardFlagsEnum.OPTION_ONE) && (<StatusView initialItems={currentItem.status} initialTitle={currentItem.templateValues.titleStatus}/>)}
        {isChecked(CardFlagsEnum.OPTION_TWO) && (<ValueView initialTitle={currentItem.templateValues.titleValue}/>)}
        {isChecked(CardFlagsEnum.OPTION_THREE) && (<CheckView title={currentItem.templateValues.titleCheck} options={currentItem.titleCheckElements}/>)}
        {isChecked(CardFlagsEnum.OPTION_FOUR) && (<ReportFieldView initialTitle={currentItem.templateValues.titleReportField}/>)}
        {isChecked(CardFlagsEnum.OPTION_SIX) && (<ValueView initialTitle={currentItem.templateValues.titlePositive} stile='grideffect'/>)}
        {isChecked(CardFlagsEnum.OPTION_SEVEN) && (<ValueView initialTitle={currentItem.templateValues.titleNegative} stile='grideffect'/>)}
      </div>
  );
};

export default CardContent;