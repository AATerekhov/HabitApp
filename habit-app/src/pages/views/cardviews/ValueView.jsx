import React, { useState, useEffect } from 'react'
import '../view.css';

const ValueView = ({ initialTitle = 'status', stile = "gridvalue"}) => {   
  const [title, setTitle] = useState(initialTitle);   
  const [selected, setSelected] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;    
    setSelected(newValue);
  };

  useEffect(() => {
    setTitle(initialTitle);  
  }, [ initialTitle]);

  return (
    <div className={stile}>
        <React.Fragment>
            <div className="namecell"> <a className='row'>{title}</a></div>
            <div className="controlscell">
            <input 
            type="number"
            value={selected}
            onChange={handleChange}
            placeholder="num."
            className="input"
            />   
            </div>
        </React.Fragment>
    </div>
  );
};

export default ValueView;