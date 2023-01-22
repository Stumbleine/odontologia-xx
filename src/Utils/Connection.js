import axios from 'axios';
/**
 * Configuracion de axios, indica la URL del API
 * @constant API
 * @exports API
 */
const URL = 'http://192.168.1.7:8080/'
const API = axios.create({
	baseURL: URL,
	responseEncoding: 'utf8',
});

export default API;