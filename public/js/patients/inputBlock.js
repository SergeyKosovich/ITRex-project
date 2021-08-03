/* eslint-disable import/extensions */
import addDiv from './addDiv.js';

export default function inputPatient(queqe, addForm, patientStack) {
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    if (!inner) {
      return;
    }
    addDiv(patientStack, inner);
    queqe.push(inner);
    e.target.elements.patient.value = '';
  });
}
