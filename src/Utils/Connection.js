import axios from 'axios';
/**
 * Configuracion de axios, indica la URL del API
 * @constant API
 * @exports API
 */

// export const URL = 'http://192.168.100.55:8080';
export const URL = 'https://backend-sigloxx.herokuapp.com';
const API = axios.create({
	baseURL: URL,
	responseEncoding: 'utf8',
});

export default API;
