import addResolution from "./doctor/addResolution.js";
import deleteResolutionFromStorage from "./doctor/deleteResolutionFromStorage.js";
import removePatientFromStack from "./doctor/removePatientFromStack.js";
import showResolution from "./doctor/showResolution.js";
import { data } from "./main.js";
import checkNewPatients from "./doctor/checkNewPatient.js";
import checkBoxChange from "./doctor/checkBox.js";
import doctorService from "./doctorService.js";

const { ws } = data;
const removeButton = document.querySelector(".current-patient__button");
const lastPatient = document.querySelector(".current-patient-patient");
const setResolution = document.querySelector(".set-resolution__form");
const textareaInSetResolution = document.querySelector(
  ".set-resolution__input"
);
const showResolutionForm = document.querySelector(".show_resolution__form");
const showResolutionInput = document.querySelector(".show_resolution__input");
const resolutionText = document.querySelector(".delete_resolution__text");
const deleteForm = document.querySelector(".delete_resolution__form");
const checkBox = document.querySelector(".input-block__checkbox");
const inputTtl = document.querySelector(".input-block__ttl-number");
const logoutButton = document.getElementById("logoutButton");

/**
 *  funcs
 */
doctorService.getDoctor();
logoutButton.addEventListener("click", doctorService.logoutDoctor);

checkBoxChange(checkBox, inputTtl);
removePatientFromStack(removeButton, lastPatient);

addResolution(lastPatient, setResolution, textareaInSetResolution);
showResolution(showResolutionForm, showResolutionInput, resolutionText);
deleteResolutionFromStorage(showResolutionInput, deleteForm, resolutionText);

/**
 *  websocket
 */
ws.addEventListener("open", () => console.log("Connection opened..."));
ws.addEventListener("close", () => console.log("Connection closed..."));
ws.addEventListener("error", (e) => console.log(e));
ws.addEventListener("message", async (res) => {
  let response;
  try {
    response = JSON.parse(res.data);
  } catch (e) {
    console.log(e);
    return;
  }
  if (response.event === "addUser") {
    checkNewPatients(lastPatient);
  }
});
checkNewPatients(lastPatient);
