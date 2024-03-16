import axios from "axios";

const BASE_URL = "http://localhost:3000";

class DonorAPI {
  // Donor login
  static login(values) {
    return axios.post(`${BASE_URL}/donor/login`, values);
  }

  // Donor Register
  static register(values) {
    return axios.post(`${BASE_URL}/donor/register`, values);
  }
  
  // Get all Donors
  static getDonors() {
    return axios.get(`${BASE_URL}/donor/donors`);
  }

  // Get one Donor
  static getOneDonor(id) {
    return axios.get(`${BASE_URL}/donor/donor/${id}`);
  }

  // Edit Donor
  static editDonor(id, newDonor) {
    return axios.put(`${BASE_URL}/donor/donor/update/${id}`, newDonor);
  }

  // Delete Donor
  static deleteDonor(id) {
    return axios.delete(`${BASE_URL}/donor/donor/delete/${id}`);
  }
}

export default DonorAPI;
