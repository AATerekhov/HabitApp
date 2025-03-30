import React, { useState, useEffect } from 'react'
import '../view.css';

const CoinsCreateCardMinimal = ({ initialElement, isMinimalHandle , onChange, stile = "minimalcard"}) => {   
  const [title, setTitle] = useState(initialElement.name);   
  const [isMinimal, setIsMinimal] = useState(isMinimalHandle);

  const toggleIsOpen = () => {
    // setIsMinimal(prevIsMinimal => !prevIsMinimal);
    onChange(!isMinimal);
  };

  useEffect(() => {
    setTitle(initialElement.name);  
    setIsMinimal(isMinimalHandle);
  }, [ initialElement, isMinimalHandle]);

  return (<div className={stile}>
      <React.Fragment>
        <div className="namecell"> 
          <a>{title}</a>
        </div>
        <div className="controlscell">
          <a class="btn btn-default" href="#" onClick={() => toggleIsOpen()}>
            {isMinimal && (<i class="fa fa-eye fa-lg" title="Open"></i>)}
            {!isMinimal && (<i class="fa fa-eye-slash fa-lg" title="Close"></i>)}            
          </a>
        </div>  
      </React.Fragment>
    </div>);
};

export default CoinsCreateCardMinimal;