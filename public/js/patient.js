import inputPatient from './patients/inputBlock.js';
import showForPatient from './patients/showForPatient.js';
import { data } from './main.js';
import renderPatientInStack from './patients/renderPatientInStack.js';

const { ws } = data;
const addForm = document.querySelector('.input-block__form');
const patientStack = document.getElementsByClassName('patient-stack')[0];
const patientSearchForm = document.querySelector('.search-block');
const patientSearchInput = document.querySelector('.search-block__input');
const patientResults = document.querySelector('.search-block__results');

inputPatient(addForm, patientStack);
showForPatient(patientSearchForm, patientSearchInput, patientResults);

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
renderPatientInStack(patientStack);
