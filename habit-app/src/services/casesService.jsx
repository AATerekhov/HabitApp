import axios from 'axios'

async function getAllRoomsFromApi() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Cases`);
  return response.data;
}

async function getRoomFoIdFromApi(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Cases/${id}`);
  return response.data;
}

async function addRoomFromApi(name) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/Cases`,{ ownerId: '',name: name });
  return response.data;
}

async function deleteRoomFromApi(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Cases/${id}`);
  return response.data;
}

async function updateRoomFromApi(name, id) {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/Cases`,{name: name, id: id});
  return response.data;
}

export {
  getAllRoomsFromApi,
  addRoomFromApi,
  deleteRoomFromApi,
  updateRoomFromApi,
  getRoomFoIdFromApi
}
