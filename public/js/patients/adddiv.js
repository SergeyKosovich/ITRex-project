import createDiv from './creatediv.js';

export default function addDiv(selector, text) {
  const pacient = createDiv('span');
  pacient.className = 'patient-stack-patient';
  pacient.innerHTML = text;
  selector.append(pacient);
}
