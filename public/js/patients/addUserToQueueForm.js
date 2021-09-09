import addPatientToStack from "./addPatientToStack.js";
import postUserToQueue from "../httpRequests/patientPageRequests/postUserToQueue.js";

export default async function addUserToQueueForm(addForm, patientStack) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inner = e.target.elements.patient.value;
    const specialization = e.target.elements.specialization.value;

    const response = await postUserToQueue(inner, specialization);
    if (!response) {
      return;
    }
    addPatientToStack(patientStack, specialization);
  });
}
