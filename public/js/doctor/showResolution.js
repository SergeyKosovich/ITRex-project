import { getResolutionsByName } from "../doctorPage/doctorFetch.js";
import namePrettier from "../utils/namePrettier.js";

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("doctor-jwt");

    const { data, message } = await getResolutionsByName(jwt, input.value);

    if (message) {
      resolutionText.value = message;
      return;
    }

    const { resolutions, patients } = data;

    if (patients) {
      const names = patients.map(({ name }) => namePrettier(name)).join("\n");

      resolutionText.value =
        `\t We have several patients with that name. \n` +
        `Please choose one to see the resolutions: \n\n` +
        `${names}`;
      return;
    }

    const text = resolutions
      .map(
        (resolution) =>
          `\t\t Medical card №: ${resolution.patient_id} \n` +
          `Patient: ${namePrettier(resolutions[0].name)} \n` +
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
