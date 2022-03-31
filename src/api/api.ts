import axios from 'axios';

const Api = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/https://wegotrip.com/api/v2/`
});

export default Api;