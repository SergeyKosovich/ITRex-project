/* eslint-disable import/extensions */
import inputPatient from './patients/inputBlock.js';
import showForPatient from './patients/showForPatient.js';
import checkBoxChange from './patients/checkBox.js';
import { data } from './main.js';

const { ws } = data;
const addForm = document.querySelector('.input-block__form');
const patientStack = document.getElementsByClassName('patient-stack')[0];
const patientSearchForm = document.querySelector('.search-block');
const patientSearchInput = document.querySelector('.search-block__input');
const patientResults = document.querySelector('.search-block__results');
const checkBox = document.querySelector('.input-block__checkbox');
const inputTtl = document.querySelector('.input-block__ttl-number');

inputPatient(addForm, patientStack, ws);
showForPatient(patientSearchForm, patientSearchInput, patientResults);
checkBoxChange(checkBox, inputTtl);

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('close', () => console.log('Connection closed...'));
ws.addEventListener('error', (e) => console.log(e));
ws.addEventListener('message', async (res) => {
  const { event } = JSON.parse(res.data);
  if (event === 'removeUser' && patientStack.firstChild) {
    patientStack.removeChild(patientStack.firstChild);
  }
});
