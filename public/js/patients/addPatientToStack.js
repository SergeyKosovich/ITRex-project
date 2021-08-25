import createDiv from './createDiv.js';

export default function addPatientToStack(selector, text) {
  const patient = createDiv('span');
  patient.className = 'patient-stack-patient';
  patient.innerHTML = text;
  selector.append(patient);
  return patient;
}
