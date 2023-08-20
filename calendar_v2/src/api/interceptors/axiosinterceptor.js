import axios from "axios";

function axiosInterceptor() {
  axios.defaults.baseURL = window.location.origin;
  (function () {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    // const baseUrl = window.location.origin;

    axios.defaults.baseURL = baseUrl ? baseUrl : window.location.origin;
  })();

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers["x-access-token"] = token;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        console.log("authorization error", error);
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}

export { axiosInterceptor };
