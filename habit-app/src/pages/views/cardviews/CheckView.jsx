import React, { useState, useEffect } from 'react';

const CheckView = ({ onFlagsChange, options, title = 'Select options:' }) => {
  const [selectedOptions, setSelectedOptions] = useState([]); // Начальное значение - пустой массив

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        // Если опция уже выбрана, удаляем её
        const newSelected = prevSelected.filter((item) => item !== option);

        if (onFlagsChange){
          onFlagsChange(newSelected); 
        }  
        return newSelected;
      } else {
        // Если опция не выбрана, добавляем её
        const newSelected = [...prevSelected, option];
        if (onFlagsChange){
            onFlagsChange(newSelected);  
          }          
        return newSelected;
      }
    });
  };

  useEffect(() => {
    // Если нужно инициализировать состояние из props, можно сделать это здесь
    // setSelectedOptions(initialOptions);
  }, []); // Зависимости можно указать, если нужно

  return (
    <div className='standard'>
      <a>{title}</a>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionChange(option)}
          />
          <label className="label-inline" htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckView;