import addPacientToStack from './addPacientToStack.js';
import newUserPost from '../httpRequests/patientPageRequests/newUserPost.js';

export default async function inputPatient(addForm, patientStack, usersInTtl) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    const response = await newUserPost(inner, e.target.ttlNumber.value);
    if (!response) {
      return;
    }
    const child = addPacientToStack(patientStack, inner);
    if (e.target.ttl.checked) {
      usersInTtl.set(inner, child);
    }
    e.target.elements.patient.value = '';
    e.target.ttlNumber.value = '';
  });
}
