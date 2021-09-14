import { loginDoctor, getDoctorData } from "./doctorFetch.js";

const loginWrapper = document.querySelector(".login-wrapper");
const logoutWrapper = document.querySelector(".logout-wrapper");
const userLogin = document.querySelector(".logout-user-name");

class DoctorService {
  authDoctor = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const doctor = await loginDoctor({ email, password });
    if (!doctor) return;

    localStorage.setItem("doctor-jwt", doctor.token);
    document.location.href = `http://localhost:3000/doctor.html`;
  };

  getDoctor = async () => {
    const jwt = localStorage.getItem("doctor-jwt");

    const doctor = await getDoctorData(jwt);
    if (!doctor) return;

    userLogin.innerHTML = `${doctor.name} | '${doctor.specializations[0].name}'`;
    loginWrapper.classList.add("hidden");
    logoutWrapper.classList.add("active");
  };

  logoutDoctor() {
    localStorage.removeItem("doctor-jwt");
    document.location.replace(`http://localhost:3000/doctorLogin.html`);
  }
}

export default new DoctorService();
