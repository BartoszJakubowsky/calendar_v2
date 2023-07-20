import axios from "axios";

const getCalendars = async () => {
    return axios.post('/calendar').then(response => response.data).catch(err =>
        {
            console.log('get calendars error');
        });
}

const createCalendar = async (calendar) => 
{   
    return axios.post('/calendar/create', calendar).then(response => 
        {
            console.log(response);
            return response.data;
        }).catch(err => 
            {
                console.log('authentication error', err);
                return {message: 'apiError'}
            })
}

export {createCalendar, getCalendars}
