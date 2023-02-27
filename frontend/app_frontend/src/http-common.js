import axios from "axios";

// Global backend api url for axios requests
export const backendApiURL = 'http://localhost:8000';
export default axios.defaults.baseURL = backendApiURL;