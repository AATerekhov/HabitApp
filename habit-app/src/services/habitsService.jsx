import axios from 'axios'

async function getRoomsHabitsFromApi(roomId, personId) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Habits/room/person/${roomId}`, {
    params: {
        personId: personId
    }
  });
  return response.data;
}

async function getRoomDetailFromApi(roomId) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Habits/rooms/${roomId}`);
    return response.data;
  }

  async function getDetailHabitsRoomFromApi(roomId) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Habits/room/${roomId}`);
    return response.data;
  }

async function getHabitFoIdFromApi(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Habits/${id}`);
  return response.data;
}

async function addHabitFromApi(createModel) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/Habits`, createModel);
  return response.data;
}

async function deleteHabitFromApi(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Habits/${id}`);
  return response.data;
}

async function setCardInHabitFromApi(setCardRequest) {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/Habits/install`, setCardRequest);
    return response.data;
  }

async function updateHabitFromApi(updateModel) {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/Habits`, updateModel);
    return response.data;
}

export {
  getRoomsHabitsFromApi,
  getHabitFoIdFromApi,
  addHabitFromApi,
  deleteHabitFromApi,
  updateHabitFromApi,
  setCardInHabitFromApi,
  getRoomDetailFromApi,
  getDetailHabitsRoomFromApi
}
