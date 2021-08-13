/* eslint-disable import/extensions */
import addResolution from './doctor/addResolution.js';
import deleteRes from './doctor/deleteRes.js';
import reomoveFromStack from './doctor/removePatientFromStack.js';
import showRes from './doctor/showRes.js';
import { data } from './main.js';

const { map } = data;
const { ws } = data;
const removeButton = document.querySelector('.current-patient__button');
const lastPatient = document.querySelector('.current-patient-patient');
const setResolution = document.querySelector('.set-resolution__form');
const textareaInSetResolution = document.querySelector(
  '.set-resolution__input',
);
const showResolutionform = document.querySelector('.show_resolution__form');
const showResolutioninput = document.querySelector('.show_resolution__input');
const resoltext = document.querySelector('.delete_resolution__text');
const deleteform = document.querySelector('.delete_resolution__form');

addResolution(map, lastPatient, setResolution, textareaInSetResolution);
deleteRes(showResolutioninput, deleteform, resoltext);
reomoveFromStack(removeButton, lastPatient, ws);
showRes(showResolutionform, showResolutioninput, resoltext);

ws.addEventListener('open', () => console.log('Connection opened...'));
ws.addEventListener('close', () => console.log('Connection closed...'));
ws.addEventListener('error', (e) => console.log(e));
ws.addEventListener('message', async (res) => {
  const { event } = JSON.parse(res.data);
  if (event === 'addUser') {
    try {
      const userCurrent = await fetch('/name');
      const name = await userCurrent.json();
      lastPatient.innerHTML = name;
    } catch (err) {
      console.log(err);
    }
  }
});
