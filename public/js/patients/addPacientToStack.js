import createDiv from './createDiv.js';

export default function addPacientToStack(selector, text) {
  const pacient = createDiv('span');
  pacient.className = 'patient-stack-patient';
  pacient.innerHTML = text;
  selector.append(pacient);
  return pacient;
}
