import axios from "axios";

const getCalendars = async () => {
    return axios.post('/calendar').then(response => response.data);
}

const createCalendar = async (calendar) => 
{
    console.log('do api', calendar);
    return axios.post('/calendar/create').then(response => 
        {
            return {message: response.data.message}
        }).catch(err => 
            {
                console.log('authentication error', err);
                return {message: 'apiError'}
            })
}

export {createCalendar, getCalendars}
