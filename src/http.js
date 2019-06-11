import axios from "axios";

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function HTTP(params) {
    // Set config defaults when creating the instance
    const instance = axios.create({
        baseURL: 'https://api.example.com'
  } );
  
  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

export default HTTP;