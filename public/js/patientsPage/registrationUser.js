const registrationButton = document.getElementById('registrationButton');

export default async function registrationUser() {
  registrationButton.addEventListener('click', async () => {
    window.location.href = './registration.html';
  });
}
