import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.234.48.35:8000",

});

export default instance;
