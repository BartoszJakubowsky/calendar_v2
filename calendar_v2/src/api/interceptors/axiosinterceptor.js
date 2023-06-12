import axios from 'axios';
function axiosInterceptor() 
{
    // axios.defaults.baseURL = 'http://localhost:3002';
    //axios.defaults.baseURL = window.location.origin;
    const setBaseUrl = () => {
      const baseUrl = import.meta.env.BASE_URL;

      if (!baseUrl)
        axios.defaults.baseURL = window.location.origin;
      else
        axios.defaults.baseURL = 'http://localhost:3002';
    }
    setBaseUrl();
    axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token');
          if (token) 
            config.headers['x-access-token'] = token;
          return config
        },
        error => {
          Promise.reject(error)
        }
      )
      axios.interceptors.response.use(
        response => {
          return response
        },
      function (error) {
          if (error.response.status === 401) 
          {
            console.log('authorization error', error);
            localStorage.removeItem('token');
            navigate('/logowanie');
            return Promise.reject(error)
          }
          return Promise.reject(error)
        }
      )
}

export {axiosInterceptor};