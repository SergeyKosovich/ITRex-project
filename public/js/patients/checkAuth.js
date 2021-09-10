import getUser from "../httpRequests/patientPageRequests/getUser.js";
// import userDataPost from '../httpRequests/patientPageRequests/userDataPost.js';

const loginWrapper = document.querySelector(".login-wrapper");
const logoutWrapper = document.querySelector(".logout-wrapper");
const userLogin = document.querySelector(".logout-user-name");
const userName = document.querySelector(".input-block__input");

export default async function checkAuth() {
  // const userMail = localStorage.getItem('email');
  // const userPass = localStorage.getItem('password');
  // const response = await userDataPost(userMail, userPass);
  const jwt = localStorage.getItem("jwt");

  const response = await getUser(jwt);
  if (!response?.token) {
    return;
  }
  localStorage.setItem("jwt", response.token);
  userName.value = `${response.firstName} ${response.lastName} id:${response.patient_id}`;
  userLogin.innerHTML = `${response.firstName} ${response.lastName}`;
  loginWrapper.classList.add("hidden");
  logoutWrapper.classList.add("active");
}
