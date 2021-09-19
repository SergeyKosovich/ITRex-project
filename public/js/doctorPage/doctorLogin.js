import doctorService from './doctorService.js';

const loginAndPassword = document.querySelector('.registration-form');

loginAndPassword.addEventListener('submit', doctorService.authDoctor);
