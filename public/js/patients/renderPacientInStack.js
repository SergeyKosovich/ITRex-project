import addPacientToStack from './addPacientToStack.js';

export default async function renderPacientInStack(url, patientStack) {
  const response = await fetch(`${url}/queue`);
  if (response.status !== 200) {
    return;
  }
  const queueArr = await response.json();
  if (queueArr.length > 0) {
    queueArr.forEach((pacient) => {
      addPacientToStack(patientStack, pacient);
    });
  }
}
