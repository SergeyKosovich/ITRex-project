import addUserToQueueForm from './patients/addUserToQueueForm.js';
import showResolutionForPatient from './patients/showResolutionForPatient.js';
import authUser from './patients/authUser.js';
import logoutUser from './patients/logout.js';
import { data } from './main.js';
import registrationUser from './patients/registrationUser.js';
import checkAuth from './patients/checkAuth.js';

const { ws } = data;
const addForm = document.querySelector('.input-block__form');
const patientStack = document.getElementsByClassName('patient-stack')[0];
const patientSearchForm = document.querySelector('.search-block');
const patientResults = document.querySelector('.search-block__results');

addUserToQueueForm(addForm, patientStack);
showResolutionForPatient(patientSearchForm, patientResults);
authUser();
checkAuth();
logoutUser();
registrationUser();

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('close', () => console.log('Connection closed...'));
ws.addEventListener('error', (e) => console.log(e));
ws.addEventListener('message', async (res) => {
  let response;
  try {
    response = JSON.parse(res.data);
  } catch (e) {
    console.log(e);
    return;
  }
  if (response.event === 'removeUser' && patientStack.firstChild) {
    patientStack.removeChild(patientStack.firstChild);
  }
});
