export const getMe = async (token) => {
  const axios = require("axios");
  let resData = await axios({
    method: "get",
    url: `http://localhost:8000/api/me`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return resData;
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//>>>>>>>>>>>>>>>>>>> Request after getting the user >>>>>>>>>>>>>>>>>>>>>//
//   let userToken = JSON.parse(localStorage.getItem("userData")).token;
//   Requests.getMe(userToken).then((res) => {
//     return console.log(res);
//   });
//<<<<<<<<<<<<<<<<<<< Request after getting the user <<<<<<<<<<<<<<<<<<<<<//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
