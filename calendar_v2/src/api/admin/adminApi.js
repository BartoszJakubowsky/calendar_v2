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

export { getAllData };
