import axios from "axios";

const getCalendars = async () => {
    return axios.post('/calendar').then(response => response.data);
}

export {getCalendars};