import addDiv from './addDiv.js';

export default async function checkQueue(url, patientStack) {
  const response = await fetch(`${url}/queue`);
  if (response.status !== 200) {
    return;
  }
  const queueArr = await response.json();
  if (queueArr.length > 0) {
    queueArr.forEach((pacient) => {
      addDiv(patientStack, pacient);
    });
  }
}
