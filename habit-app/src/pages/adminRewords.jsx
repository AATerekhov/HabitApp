// import React from 'react'
// import { useSelector } from 'react-redux';

// function AdminRewords (){    
//   const selectRoom = useSelector(state => state.admin.room);

//     return (
//         <div className="container">
//           <h2>Room's Rewords "{selectRoom?selectRoom.name:''}" 🏅</h2> 
//         </div>
//       )  
// }

// export default AdminRewords;



import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminRewards() {
  const selectRoom = useSelector(state => state.admin.room);
  const [rewards, setRewards] = useState([]);
  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    cost: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    if (newReward.name && newReward.cost) {
      setRewards(prev => [...prev, { ...newReward, id: Date.now() }]);
      setNewReward({ name: '', description: '', cost: '' });
    }
  };

  const handleDelete = (id) => {
    setRewards(prev => prev.filter(reward => reward.id !== id));
  };

  return (
    <div className="container">
      <h2>Room's Rewards "{selectRoom ? selectRoom.name : ''}" 🏅</h2>
      
      {/* Форма добавления наград */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Reward</h5>
          <form onSubmit={handleAddReward}>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reward Name"
                  name="name"
                  value={newReward.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={newReward.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cost"
                  name="cost"
                  value={newReward.cost}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  Add Reward
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Таблица наград */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rewards.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No rewards added yet
                </td>
              </tr>
            ) : (
              rewards.map(reward => (
                <tr key={reward.id}>
                  <td>{reward.name}</td>
                  <td>{reward.description}</td>
                  <td>{reward.cost} points</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2">
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(reward.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminRewards;