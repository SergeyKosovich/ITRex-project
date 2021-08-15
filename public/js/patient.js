import inputPatient from './patients/inputBlock.js';
import showForPatient from './patients/showForPatient.js';
import checkBoxChange from './patients/checkBox.js';
import { data } from './main.js';

const { ws } = data;
const { usersInTtl } = data;
const addForm = document.querySelector('.input-block__form');
const patientStack = document.getElementsByClassName('patient-stack')[0];
const patientSearchForm = document.querySelector('.search-block');
const patientSearchInput = document.querySelector('.search-block__input');
const patientResults = document.querySelector('.search-block__results');
const checkBox = document.querySelector('.input-block__checkbox');
const inputTtl = document.querySelector('.input-block__ttl-number');

inputPatient(addForm, patientStack, ws, usersInTtl);
showForPatient(patientSearchForm, patientSearchInput, patientResults);
checkBoxChange(checkBox, inputTtl);

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('close', () => console.log('Connection closed...'));
ws.addEventListener('error', (e) => console.log(e));
ws.addEventListener('message', async (res) => {
  try {
    JSON.parse(res.data);
  } catch (e) {
    console.log(e);
    return;
  }
  const response = JSON.parse(res.data);

  if (response.event === 'removeUser' && patientStack.firstChild) {
    patientStack.removeChild(patientStack.firstChild);
  }
  if (response.event === 'removeAfterTtl' && response.name) {
    patientStack.removeChild(usersInTtl.get(response.name));
  }
});
