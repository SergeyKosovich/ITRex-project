/* eslint-disable import/extensions */
import addDiv from './addDiv.js';
import namePost from './namePost.js';

export default function inputPatient(addForm, patientStack, ws) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = e.target.elements.patient.value;
    try {
      await namePost(nameInput, e.target.ttlNumber.value);
    } catch (err) {
      console.log(err);
    }
    const child = addDiv(patientStack, nameInput);
    if (e.target.ttl.checked) {
      setTimeout(async () => {
        patientStack.removeChild(child);
      }, e.target.ttlNumber.value * 1000);
    }
    e.target.elements.patient.value = '';
    e.target.ttlNumber.value = '';
    ws.send(JSON.stringify({ name: nameInput, event: 'addUser' }));
  });
}
