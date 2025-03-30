import axios from 'axios'

async function getRoomCoinsFromApi(roomId, personId) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Coins/room/${roomId}`, {
    params: {
        personId: personId
    }
  });
  return response.data;
}

async function getCoinFoIdFromApi(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Coins/${id}`);
  return response.data;
}

async function addCoinFromApi(createModel) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/Coins`, createModel);
  return response.data;
}

async function deleteCoinFromApi(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Coins/${id}`);
  return response.data;
}


async function updateCoinFromApi(updateModel) {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/Coins`, updateModel);
    return response.data;
}

export {
  getRoomCoinsFromApi,
  getCoinFoIdFromApi,
  addCoinFromApi,
  deleteCoinFromApi,
  updateCoinFromApi
}
