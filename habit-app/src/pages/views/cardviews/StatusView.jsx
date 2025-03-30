import React, { useState, useEffect } from 'react'
import '../view.css';

const CardView = ({ initialItems = [], initialTitle = 'status'}) => {    
  const [items, setItems] = useState(initialItems);  
  const [title, setTitle] = useState(initialTitle);   
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    setItems(initialItems); 
    setTitle(initialTitle);  
  }, [initialItems, initialTitle]);

  return (
    <div className="grid">
        <React.Fragment>
            <div className="namecell"> <a className='row'>{title}</a></div>
            <div className="controlscell">
            <select className="input" onChange={handleChange} value={selected}>
              <option value='' disabled>{title}</option>
              {items.map(item => (<option key={item} value={item}>
              {item}
              </option>))}
            </select>  
            </div>
        </React.Fragment>
    </div>
  );
};

export default CardView;