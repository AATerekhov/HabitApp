import React, { useState, useEffect } from 'react'
import '../view.css';

const ReportFieldView = ({ initialTitle = 'status'}) => {   
  const [title, setTitle] = useState(initialTitle);   
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setTitle(initialTitle);  
  }, [ initialTitle]);

  return (
    <div className='standard'>
      <a className='row'>{title}</a>
      <textarea 
      value={text}
      onChange={handleChange}
      placeholder={title}/>
    </div>
  );
};

export default ReportFieldView;