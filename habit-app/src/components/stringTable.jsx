import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../pages/cards.css';

const StringTable = ({ initialStrings, onUpdateStrings }) => {
  const [newString, setNewString] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAddString = () => {
    if (newString.trim()) {
      const updatedStrings = [...initialStrings, newString];
      onUpdateStrings(updatedStrings);
      setNewString('');
    }
  };

  const handleDeleteString = (index) => {
    const updatedStrings = initialStrings.filter((_, i) => i !== index);
    onUpdateStrings(updatedStrings);
  };

  const handleEditString = (index) => {
    setEditIndex(index);
    setEditValue(initialStrings[index]);
  };

  const handleUpdateString = () => {
    if (editValue.trim()) {
      const updatedStrings = initialStrings.map((str, i) => (i === editIndex ? editValue : str));
      onUpdateStrings(updatedStrings);
      setEditIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="">
      <h4>Table values:</h4>
      <div className="row-button input-group"> 
        <input
          type="text"
          value={newString}
          className="input"
          onChange={(e) => setNewString(e.target.value)}
          placeholder="Add value"
        />
        <button onClick={handleAddString} className="button button-outline"><i className="fa fa-plus fa-lg" aria-hidden="true"></i></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>values</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {initialStrings.map((str, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  str
                )}
              </td>
              <td>
                {editIndex === index ? (
                    <div class="btn-group">
                      <a class="btn btn-default" href="#" onClick={() => handleUpdateString()}>
                        <i class="fa fa-check fa-lg" title="Save"></i>
                      </a>
                    </div>
                ) : (
                        <div class="btn-group">
                          <a class="btn btn-default" href="#" onClick={() => handleEditString(index)}>
                            <i class="fa fa-pencil fa-lg" title="Edit"></i>
                          </a>
                          <a class="btn btn-default" href="#" onClick={() => handleDeleteString(index)}>
                            <i class="fas fa-trash fa-lg" title="Delete"></i>
                          </a>
                        </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StringTable;