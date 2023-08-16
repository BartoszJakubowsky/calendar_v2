import axios from "axios";

const getAllData = async () => {
  return axios
    .get("/data/all")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("admin data error", err);
      return { message: "apiError" };
    });
};
const putAxios = async (path, data) => axios.put(path, data);
const postAxios = async (path, data) => axios.post(path, data);
const deleteAxios = async (path, data) => axios.delete(path, data);

const updateUser = async (user) => putAxios(`user/${user._id}`, user);
const deleteUser = async (user) => deleteAxios(`user/${user._id}`);

const addUserFromRegister = async (user) => postAxios(`register/add`, user);
const deleteUserFromRegister = async (user) =>
  deleteAxios(`register/${user._id}`);

const updateUserFromPassword = async (user) =>
  postAxios(`password/${user._id}`);
const deleteUserFromPassword = async (user) =>
  postAxios(`password/${user._id}`);

const deleteCalendar = async (calendar) =>
  deleteAxios(`calendar/${calendar._id}`);

const updateCalendar = async (calendarId, calendar) =>
  putAxios(`calendar/${calendarId}`, calendar);
export {
  getAllData,
  updateUser,
  deleteUser,
  addUserFromRegister,
  deleteUserFromRegister,
  updateUserFromPassword,
  deleteUserFromPassword,
  deleteCalendar,
  updateCalendar,
};
