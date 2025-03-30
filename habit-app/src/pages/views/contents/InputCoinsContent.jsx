import React, { useState, useEffect } from 'react'
import '../view.css';

const InputCoinsContent = ({ onChange, costOfWinning = 0 }) => { 
  const [selected, setSelected] = useState(costOfWinning);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;    
    setSelected(newValue);
  };

  const handleChangeApply = () => {
    onChange(selected);
  };

  return (
    <div className="inputcaoinscard">
      <React.Fragment>
        <div className="namecell"> <a className='row'>💰</a></div>
        <div className="controlscell">
          <input type="number" value={selected} onChange={handleChange} placeholder="num." className="input"/>   
        </div>        
        <div className="controlscell">
          <button onClick={() => handleChangeApply()} className="button"><i className="fa fa-check fa-lg" aria-hidden="true"></i></button>
        </div> 
      </React.Fragment>
    </div>
  );
};

export default InputCoinsContent;