import axios from 'axios';

export default {
  getCity: () => axios.get(`/city`),
};
