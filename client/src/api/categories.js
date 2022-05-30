import axios from 'axios';

export default {
  getCategory: () => axios.get(`/category`),
};
