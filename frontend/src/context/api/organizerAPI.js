import axios from "axios";

const BASE_URL = "http://localhost:3000";

class OrganizerAPI {
  // Organizer login
  static login(values) {
    return axios.post(`${BASE_URL}/api/login`, values);
  }

  // Organizer Register
  static register(values) {
    return axios.post(`${BASE_URL}/api/register`, values);
  }

  // Get all Organizers
  static getOrganizers() {
    return axios.get(`${BASE_URL}/api/organizers`);
  }

  // Get one Organizer
  static getOneOrganizer(id) {
    return axios.get(`${BASE_URL}/api/organizer/${id}`);
  }

  // Edit Organizer
  static editOrganizer(id, newOrganizer) {
    return axios.put(`${BASE_URL}/api/organizer/update/${id}`, newOrganizer);
  }

  // Delete Organizer
  static deleteOrganizer(id) {
    return axios.delete(`${BASE_URL}/api/organizer/delete/${id}`);
  }
}

export default OrganizerAPI;
