import axios from 'axios';
/**
 * Configuracion de axios, indica la URL del API
 * @constant API
 * @exports API
 */
// https://backend-sigloxx.herokuapp.com
// export const URL = 'https://backend-sigloxx.herokuapp.com';
export const URL = 'http://192.168.1.10:8081';
const API = axios.create({
	baseURL: URL,
	responseEncoding: 'utf8',
});

export default API;
