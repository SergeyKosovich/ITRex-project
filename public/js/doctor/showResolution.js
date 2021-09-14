import { getResolutionsByName } from "../doctorPage/doctorFetch.js";

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("doctor-jwt");

    const { data, message } = await getResolutionsByName(jwt, input.value);

    if (message) {
      resolutionText.value = message;
      return;
    }

    const name = data[0].name
      .split(" ")
      .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
      .join(" ");

    const text = data
      .map(
        (resolution) =>
          `\t\t Medical card №: ${resolution.patient_id} \n` +
          `Patient: ${name} \n` +
          `Gender: ${resolution.gender} \n` +
          `DoB: ${resolution.birthday} \n` +
          `Resolution №: ${resolution.resolution_id}: ${resolution.resolution} \n` +
          `Date of creation: ${resolution.createdData.split("T")[0]} \n` +
          `Doctor: ${resolution.doctorName} \n\n`
      )
      .join(" ");

    resolutionText.value = text;
  });
}
