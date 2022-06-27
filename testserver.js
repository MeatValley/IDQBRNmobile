import axios from "axios";
const fetchData = () => {
    const baseURL = "http://localhost:4554/users";
    axios.get(`${baseURL}`).then((response) => console.log(response.data));
};
fetchData();