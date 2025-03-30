import React, { useState, useEffect } from 'react';

const ElementOptions = ({initialFlags ,onFlagsChange , flagsEnum, flagsLabels, title='Select options:'}) => {
  const [selectedFlags, setSelectedFlags] = useState(initialFlags); // Начальное значение - 0 (нет флагов)

  const handleFlagChange = (flag) => {
    const newFlags = selectedFlags ^ flag; // Используем XOR для переключения флага
    setSelectedFlags(newFlags);
    onFlagsChange(newFlags); // Передаем новое значение родителю
  };

  useEffect(() => {
    setSelectedFlags(initialFlags); // Обновляем состояние, если начальные флаги изменяются
  }, [initialFlags]);

  return (
    <div>
      <a>{title}</a>
      {Object.entries(flagsEnum).map(([key, value]) => (
         <div>
            <input 
                type="checkbox" 
                id={key}
                checked={(selectedFlags & value) !== 0}
                onChange={() => handleFlagChange(value)}
            />
            <label class="label-inline" for={key}>{flagsLabels[value]}</label>   
        </div>
      ))}
    </div>    
  );
};

export default ElementOptions;