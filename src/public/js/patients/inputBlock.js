/* eslint-disable import/extensions */
import addDiv from './addDiv.js';
import namePost from './namePost.js';

export default function inputPatient(addForm, patientStack, ws) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inner = e.target.elements.patient.value;
    await namePost(inner, e.target.ttlNumber.value);
    const child = addDiv(patientStack, inner);
    if (e.target.ttl.checked) {
      setTimeout(async () => {
        patientStack.removeChild(child);
      }, e.target.ttlNumber.value * 1000);
    }
    e.target.elements.patient.value = '';
    e.target.ttlNumber.value = '';
    ws.send(JSON.stringify({ name: inner, event: 'addUser' }));
  });
}
