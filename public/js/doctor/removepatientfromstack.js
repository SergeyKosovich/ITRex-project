import addFirstPatient from './addFirstPatient.js';

export default function reomoveFromStack(arr, removeButton, patientStack) {
  removeButton.addEventListener('click', () => {
    if (arr[0]) {
      addFirstPatient(arr.shift());
      patientStack.removeChild(patientStack.firstChild);
      return;
    }
    addFirstPatient('No pacient');
  });
}
