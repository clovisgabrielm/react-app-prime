import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:61374/api/v1"
});