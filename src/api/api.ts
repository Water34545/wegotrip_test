import axios from 'axios';

const Api = axios.create({
  baseURL: `https://wegotrip.com/api/v2//`
});

export default Api;