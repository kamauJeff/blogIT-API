import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:1000",
  withCredentials: true,
});
export default Api;
