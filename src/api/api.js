import axios from "axios";

const baseURL = "http://localhost:4569";

var users = () => {
    axios.get(`${baseURL}/users`).then((response) => {
        return response.data
    });
}
var cases = (lat, long, km) => {
    return axios.get(`${baseURL}/diseasesInRange`, {
            params: {
                latitude : lat,
                longitude: long,
                km: km,
            }
        }).then((response) => response.data)
        .catch(error=>console.log(error))
}

var currentCity = (lat, long) => {
    return axios.get(`${baseURL}/currentCity`, {
        params: {
            latitude : lat,
            longitude: long
        }
    }).then((response) => response.data)
    .catch(error=>console.log(error))
}
export { users, cases, currentCity}