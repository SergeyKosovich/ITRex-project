import addResolution from './doctorPage/addResolution.js';
import deleteResolutionFromStorage from './doctorPage/deleteResolutionFromStorage.js';
import removePatientFromStack from './doctorPage/removePatientFromStack.js';
import showResolution from './doctorPage/showResolution.js';
import { data } from './main.js';
import checkNewPatients from './doctorPage/checkNewPatient.js';
import checkBoxChange from './doctorPage/checkBox.js';

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
const patientData = [];

checkBoxChange(checkBox, inputTtl);
addResolution(patientData, setResolution, textareaInSetResolution);
deleteResolutionFromStorage(showResolutionInput, deleteForm, resolutionText);
removePatientFromStack(removeButton, lastPatient, patientData);
showResolution(showResolutionForm, showResolutionInput, resolutionText);

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
    checkNewPatients(lastPatient, patientData);
  }
});
checkNewPatients(lastPatient, patientData);
