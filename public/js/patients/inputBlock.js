import addPacientToStack from './addPacientToStack.js';
import newUserPost from '../httpRequests/patientPageRequests/newUserPost.js';

export default async function inputPatient(addForm, patientStack) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    const response = await newUserPost(inner);
    if (!response) {
      return;
    }
    addPacientToStack(patientStack, inner);
    e.target.elements.patient.value = '';
  });
}
