import userDataPost from '../httpRequests/patientPageRequests/userDataPost.js';

const popup = document.querySelector('.popup');
const loginWrapper = document.querySelector('.login-wrapper');
const logoutWrapper = document.querySelector('.logout-wrapper');
const loginAndPassword = document.querySelector('.registration-form');
const userLogin = document.querySelector('.logout-user-name');
const userName = document.querySelector('.input-block__input');

export default async function authUser() {
  loginAndPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMail = e.target.elements.email.value;
    const userPass = e.target.elements.password.value;
    const response = await userDataPost(userMail, userPass);
    if (!response) {
      popup.classList.add('active');
      setTimeout(() => {
        popup.classList.remove('active');
      }, 1000);
      return;
    }
    localStorage.setItem('jwt', response.token);
    localStorage.setItem('email', userMail);
    localStorage.setItem('password', userPass);
    userName.value = `${response.firstName} ${response.lastName} id:${response.patient_id}`;
    userLogin.innerHTML = `${response.firstName} ${response.lastName}`;
    loginWrapper.classList.add('hidden');
    logoutWrapper.classList.add('active');
  });
}
