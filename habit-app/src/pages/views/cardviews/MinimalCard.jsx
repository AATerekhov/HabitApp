import React, { useState, useEffect } from 'react'
import '../view.css';

const MinimalCard = ({ initialTitle = 'name', onChange, stile = "minimalcard"}) => {   
  const [title, setTitle] = useState(initialTitle);   
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    onChange(isOpen);
  };

  useEffect(() => {
    setTitle(initialTitle);  
  }, [ initialTitle]);

  return (<div className={stile}>
      <React.Fragment>
        <div className="namecell"> 
          <a>{title}</a>
        </div>
        <div className="controlscell">
          <a class="btn btn-default" href="#" onClick={() => toggleIsOpen()}>
            {!isOpen && (<i class="fa fa-eye fa-lg" title="Open"></i>)}
            {isOpen && (<i class="fa fa-eye-slash fa-lg" title="Close"></i>)}            
          </a>
        </div>  
      </React.Fragment>
    </div>);
};

export default MinimalCard;