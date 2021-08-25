import addResolution from './doctor/addResolution.js';
import deleteRes from './doctor/deleteRes.js';
import removeFromStack from './doctor/removePatientFromStack.js';
import showRes from './doctor/showRes.js';
import { data } from './main.js';
import checkNewPatients from './doctor/checkNewPatient.js';
import checkBoxChange from './doctor/checkBox.js';

const { ws } = data;
const removeButton = document.querySelector('.current-patient__button');
const lastPatient = document.querySelector('.current-patient-patient');
const setResolution = document.querySelector('.set-resolution__form');
const textareaInSetResolution = document.querySelector(
  '.set-resolution__input',
);
const showResolutionForm = document.querySelector('.show_resolution__form');
const showResolutionInput = document.querySelector('.show_resolution__input');
const resolutionText = document.querySelector('.delete_resolution__text');
const deleteForm = document.querySelector('.delete_resolution__form');

const checkBox = document.querySelector('.input-block__checkbox');

const inputTtl = document.querySelector('.input-block__ttl-number');
checkBoxChange(checkBox, inputTtl);

addResolution(lastPatient, setResolution, textareaInSetResolution);
deleteRes(showResolutionInput, deleteForm, resolutionText);
removeFromStack(removeButton, lastPatient);
showRes(showResolutionForm, showResolutionInput, resolutionText);

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
  if (response.event === 'addUser') {
    checkNewPatients(lastPatient);
  }
});
checkNewPatients(lastPatient);
