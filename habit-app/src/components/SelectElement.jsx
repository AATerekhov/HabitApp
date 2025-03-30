import React, { useEffect, useState } from 'react';

const SelectElement = ({ onSelectChange, getElements, disabledLogo = "Habit Card" }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await getElements(); //метод возвращает data
        setOptions(response); // Предполагается, что данные - это массив объектов
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedObj = options.find(option => option.id === selectedValue); // Предполагается, что у объекта есть поле id
    setSelectedOption(selectedObj);
    onSelectChange(selectedObj); // Вызов обработчика с выбранным объектом
  };

  return (
    <select className="input" onChange={handleChange} value={selectedOption ? selectedOption.id : ''}>
      <option value="" disabled>{disabledLogo}</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>    
  );
};

export default SelectElement;