import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV,
  // headers: {
  //   'content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*'
  // },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  console.log(localStorage.getItem("TOKEN"));
  if (localStorage.getItem("TOKEN") !== null) {
    config.headers['Token'] =  localStorage.getItem("TOKEN");
  } else {
    console.log('Token expires');
  }
  // 
  return config;
});

axiosClient.interceptors.response.use((response) => {
  console.log(response);
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient; 