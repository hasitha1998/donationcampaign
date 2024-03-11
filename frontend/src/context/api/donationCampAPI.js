import axios from "axios";

const BASE_URL = "http://localhost:3000";

class CampAPI {
  // Create a new camp
  static createCamp(campData) {
    return axios.post(`${BASE_URL}/camp/camps`, campData);
  }

  // Get all camps
  static getAllCamps() {
    return axios.get(`${BASE_URL}/camp/camps`);
  }

  // Get one camp by ID
  static getCampById(campId) {
    return axios.get(`${BASE_URL}/camp/camps/${campId}`);
  }

  // Update a camp by ID
  static updateCamp(campId, updatedCampData) {
    return axios.put(`${BASE_URL}/camp/camps/${campId}`, updatedCampData);
  }

  // Delete a camp by ID
  static deleteCamp(campId) {
    return axios.delete(`${BASE_URL}/camp/camps/${campId}`);
  }
}

export default CampAPI;
