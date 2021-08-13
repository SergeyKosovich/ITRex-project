/* eslint-disable import/extensions */
import addFirstPatient from './addFirstPatient.js';

export default function reomoveFromStack(arr, removeButton, patientStack, firstPat) {
  removeButton.addEventListener('click', () => {
    const lastPatient = arr.shift();
    if (lastPatient) {
      addFirstPatient(lastPatient, firstPat);
      patientStack.removeChild(patientStack.firstChild);
      return;
    }
    addFirstPatient('No patient', firstPat);
  });
}
