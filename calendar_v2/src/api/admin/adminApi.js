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

const updateUser = async (user) => postAxios(`user/${user._id}`, user);
const deleteUser = async (user) => deleteAxios(`user/${user._id}`);

const addUserFromRegister = async (user) => {
  console.log(user, "got");
  return putAxios(`register/add`, user);
};
const deleteUserFromRegister = async (user) =>
  deleteAxios(`register/${user._id}`);

export {
  getAllData,
  updateUser,
  deleteUser,
  addUserFromRegister,
  deleteUserFromRegister,
};
