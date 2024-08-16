import axios from "axios";

const instace = axios.create({
  baseURL: "https://burger-2a6d5-default-rtdb.firebaseio.com/",
});
export default instace;
