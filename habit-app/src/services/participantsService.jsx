import axios from 'axios'

async function addParticipantFromApi(username, roomId) {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/Participants`,{  userMail: username, caseId: roomId });
    return response.data;
  }

  async function deleteParticipantFromApi(id) {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/Participants/${id}`);
    return response.data;
  }

  async function getParticipantsFromApi() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Participants`);
    return response.data;
  }

  async function updateParticipantFromApi(id) {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Participants/${id}`);
    return response.data;
  }
  
  
export {
    addParticipantFromApi,
    deleteParticipantFromApi,
    getParticipantsFromApi,
    updateParticipantFromApi
  }