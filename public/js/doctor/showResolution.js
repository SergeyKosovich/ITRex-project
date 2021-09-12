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

    const text = data
      .map(
        (resolution) =>
          `\t Resolution №: ${resolution.resolution_id} \n` +
          `Patient: ${resolution.name} \n` +
          `Gender: ${resolution.gender} \n` +
          `DoB: ${resolution.birthday} \n` +
          `Resolution: ${resolution.resolution} \n` +
          `Date of the resolution: ${resolution.createdData.split("T")[0]} \n` +
          `Doctor: ${resolution.doctorName} \n\n`
      )
      .join(" ");

    resolutionText.value = text;
  });
}
