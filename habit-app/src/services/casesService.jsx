import axios from 'axios'

async function getDoughnutsFromApi() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/doughnuts`);
  return response.data;
}

async function addRoomFromApi(name) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/doughnuts`,{ ownerId: '',name: name });
  return response.data;
}

async function deleteRoomFromApi(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/doughnuts/${id}`);
  return response.data;
}

async function updateRoomFromApi(name, id) {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/doughnuts`,{name: name, id: id});
  return response.data;
}

export {
  getDoughnutsFromApi,
  addRoomFromApi,
  deleteRoomFromApi,
  updateRoomFromApi
}
