import createDiv from "./createDiv.js";

export default function addPatientToStack(selector, doctor) {
  const patient = createDiv("span");
  patient.className = "patient-stack-patient";
  patient.innerHTML = `you are in queue to see a "${doctor}"`;
  selector.append(patient);
  setTimeout(() => patient.remove(), 3000);
}
