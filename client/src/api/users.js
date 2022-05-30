import axios from 'axios';

export default {
  getUsers: () => axios.get("/user"),
  getUserById: (userId) => axios.get(`/user/${userId}`),
  createUser: (user) => axios.post(`/user`, user),
  deleteUser: (userId) => axios.delete(`/users/${userId}`),
  updateUser: (user) => axios.put('/users', user),
  getUserByUsername: (username) => axios.get(`/user?login=${username}`),
  getUserByUsernameAndPassword: (username, password) => axios.get(`/user/${username}/${password}`)
};
