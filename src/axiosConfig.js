import axios from "axios";

const instance = axios.create({
  baseURL: "http://65.2.175.154:8000",
  // baseURL: "http://65.2.175.154:8000",
  // baseURL: "http://43.205.241.133:4000"
});

export default instance;
