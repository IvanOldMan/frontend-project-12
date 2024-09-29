import axios from "axios";

const API_URL = '/api/v1';

const api = axios.create({
  baseURL: API_URL,
})

const currentToken = localStorage.getItem('token');

export default class AuthService {
  static async login({ username, password }) {
    try {
      const response = await api.post('/login', { username, password })
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getChannels() {
    try {
      const response = await api.get('/channels', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getMessages() {
    try {
      const response = await api.get('/messages', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}