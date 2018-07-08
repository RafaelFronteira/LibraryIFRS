import axios from 'axios';

export default axios.create({
    baseURL: '/libflix/api/'
});