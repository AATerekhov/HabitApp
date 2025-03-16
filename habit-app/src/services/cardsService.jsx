import axios from 'axios'

async function getCardsFromApi() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Cards`);
  return response.data;
}

async function getCardFoIdFromApi(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/Cards/${id}`);
  return response.data;
}

async function addCardFromApi(createModel) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/Cards`, createModel);
  return response.data;
}

async function deleteCardFromApi(id) {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Cards/${id}`);
  return response.data;
}

async function updateCardFromApi(updateModel) {
  const templateResponse = await axios.put(`${import.meta.env.VITE_API_URL}/Cards/${updateModel.templateValues.id}`, updateModel.templateValues);
  if (templateResponse.data){
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/Cards`, updateModel);
    return response.data;
  }else{
    return templateResponse.data;
  }
}

export {
  getCardsFromApi,
  addCardFromApi,
  deleteCardFromApi,
  updateCardFromApi,
  getCardFoIdFromApi
}
