import postPatientToQueue from '../httpRequests/patientPageRequests/postPatientToQueue.js';

export default async function addUserToQueueForm(addForm) {
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('patientId');
    await postPatientToQueue(id);
  });
}
