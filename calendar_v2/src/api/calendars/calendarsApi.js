import axios from "axios";

const getCalendars = async () => {
    return axios.post('/calendar').then(response => response.data);
}

const createCalendar = async (calendar) => 
{
    return axios.post('/calendar/create').then(response => 
        {
            const message =  response.data.message;
            const token = response.data.token;

            if (token)
                return ({message, token})
            return(message);

        }).catch(err => 
            {
                console.log('authentication error', err);
                return 'error'
            })
}

export {createCalendar, getCalendars}
