const logoutButton = document.getElementById('logoutButton');
const loginWrapper = document.querySelector('.login-wrapper');
const logoutWrapper = document.querySelector('.logout-wrapper');
const userName = document.querySelector('.input-block__input');

export default async function logoutUser() {
  logoutButton.addEventListener('click', async () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    loginWrapper.classList.remove('hidden');
    logoutWrapper.classList.remove('active');
    userName.value = '';
    document.location.reload();
  });
}
