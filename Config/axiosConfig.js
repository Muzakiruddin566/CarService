import axios from 'axios';

const DesolInt = axios.create({
  baseURL: process.env.BASE_URL, 
});

export default DesolInt;
