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
    userName.value = `${response.name} id:${response.patient_id}`;
    userLogin.innerHTML = `${response.name}`;

    loginWrapper.classList.add('hidden');
    logoutWrapper.classList.add('active');
  });
}
