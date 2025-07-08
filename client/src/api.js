import axios from "axios";

export const fetchResults = (data) => {
  return axios.post("http://localhost:5000/api/search", data).then(res => res.data);
};
