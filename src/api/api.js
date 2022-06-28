import axios from "axios";

const baseURL = "http://localhost:4569";

var users = () => {
    axios.get(`${baseURL}/users`).then((response) => {
        return response.data
    });
}
var cases = (lat, long, km) => {
    axios.get(`${baseURL}/diseasesInRange`, {
        params: {
            latitude : lat,
            longitude: long,
            km: km,
        }
        
    }).then((response) => {
        console.log('fui chamado')
        console.log('casos')
        console.log(response.data)
        return response.data
    });
}

var currentCity = (lat, long) => {
    axios.get(`${baseURL}/currentCity`, {
        params: {
            latitude : lat,
            longitude: long
        }
    }).then((response) => {
        console.log('fui chamado')
        console.log('casos')
        console.log(response.data)
        return response.data[0]
    });
}

export { users, cases, currentCity }