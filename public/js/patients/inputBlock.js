/* eslint-disable import/extensions */
import addDiv from './addDiv.js';

export default function inputPatient(queqe, addForm, patientStack, map) {
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    if (e.target.ttl.checked) {
      setTimeout(() => {
        map.delete(inner);
      }, e.target.ttlNumber.value * 1000);
    }
    addDiv(patientStack, inner);
    queqe.push(inner);
    e.target.elements.patient.value = '';
  });
}
