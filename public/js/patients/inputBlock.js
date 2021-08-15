import addDiv from './addDiv.js';
import newUserPost from './newUserPost.js';

export default function inputPatient(addForm, patientStack, ws, usersInTtl) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    try {
      const response = await newUserPost(inner, e.target.ttlNumber.value);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      const child = addDiv(patientStack, inner);
      if (e.target.ttl.checked) {
        usersInTtl.set(inner, child);
      }
      e.target.elements.patient.value = '';
      e.target.ttlNumber.value = '';
    } catch (err) {
      console.log(err);
    }
  });
}
