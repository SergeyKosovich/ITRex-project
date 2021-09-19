import userDataPatch from "./httpRequests/patientPageRequests/userDataPatch.js";

const registrationForm = document.querySelector(".registration-form");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup__text");
const linkToPatient = document.querySelector(".link-to-patient");
registrationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMail = e.target.elements.email.value;
  const userPass = e.target.elements.password.value;
  const userFirstName = e.target.elements.firstName.value;
  const userLastName = e.target.elements.lastName.value;
  const userGender = e.target.elements.gender.value;
  const userBirthday = e.target.elements.birthday.value;
  const response = await userDataPatch(
    userMail,
    userPass,
    userFirstName,
    userLastName,
    userGender,
    userBirthday
  );
  if (!response) {
    popupText.innerHTML = "this email is already registered!";
    popup.classList.add("active");
    setTimeout(() => {
      popup.classList.remove("active");
    }, 1500);
    return;
  }
  popupText.innerHTML = "successfully registered!";
  popup.classList.add("active");
  setTimeout(() => {
    popup.classList.remove("active");
  }, 1000);
  linkToPatient.classList.add("active");
  registrationForm.reset();
});
