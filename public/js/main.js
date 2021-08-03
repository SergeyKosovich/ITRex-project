/* eslint-disable import/extensions */
import inputPatient from './patients/inputBlock.js';
import reomoveFromStack from './doctor/removePatientFromStack.js';
import addResolution from './doctor/addResolution.js';
import showRes from './doctor/showRes.js';
import deleteRes from './doctor/deleteRes.js';
import showForPatient from './patients/showForPatient.js';

const queqe = [];
const map = new Map();
const addForm = document.querySelector('.input-block__form');
const patientStack = document.querySelector('.patient-stack');
const removeButton = document.querySelector('.current-patient__button');
const lastPatient = document.querySelector('.current-patient-patient');
const setResolution = document.querySelector('.set-resolution__form');
const textareaInSetResolution = document.querySelector('.set-resolution__input');
const showResolutionform = document.querySelector('.show_resolution__form');
const showResolutioninput = document.querySelector('.show_resolution__input');
const resoltext = document.querySelector('.delete_resolution__text');
const deleteform = document.querySelector('.delete_resolution__form');
const patientSearchForm = document.querySelector('.search-block');
const patientSearchInput = document.querySelector('.search-block__input');
const patientResults = document.querySelector('.search-block__results');

inputPatient(queqe, addForm, patientStack);
reomoveFromStack(queqe, removeButton, patientStack, lastPatient);
addResolution(map, lastPatient, setResolution, textareaInSetResolution);
showRes(map, showResolutionform, showResolutioninput, resoltext);
deleteRes(map, showResolutioninput, deleteform, resoltext);
showForPatient(map, patientSearchForm, patientSearchInput, patientResults);
