import getUser from '../httpRequests/patientPageRequests/getUser.js';

const loginWrapper = document.querySelector('.login-wrapper');
const logoutWrapper = document.querySelector('.logout-wrapper');
const userLogin = document.querySelector('.logout-user-name');
const userName = document.querySelector('.input-block__input');

export default async function checkAuth() {
  const jwt = localStorage.getItem('jwt');

  const response = await getUser(jwt);
  if (!response?.token) {
    return;
  }
  localStorage.setItem('jwt', response.token);
  userName.value = `${response.name} id:${response.patient_id}`;
  userLogin.innerHTML = `${response.name}`;
  loginWrapper.classList.add('hidden');
  logoutWrapper.classList.add('active');
}
