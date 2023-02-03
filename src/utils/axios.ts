import axios from 'axios';
// import serverAddress from '../config';

const instance = axios.create({
    baseURL: 'localhost:5007',
    timeout: 30000,
});

export { instance as default };
