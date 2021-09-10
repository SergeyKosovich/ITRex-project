const loginWrapper = document.querySelector('.login-wrapper');
const logoutWrapper = document.querySelector('.logout-wrapper');
const userLogin = document.querySelector('.logout-user-name');
const userName = document.querySelector('.input-block__input');

export default async function checkAuth() {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return;
  }
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const patientId = localStorage.getItem('patientId');
  userName.value = `${firstName} ${lastName} id:${patientId}`;
  userLogin.innerHTML = `${firstName} ${lastName}`;
  loginWrapper.classList.add('hidden');
  logoutWrapper.classList.add('active');
}
