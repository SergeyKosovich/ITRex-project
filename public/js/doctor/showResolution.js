import { getResolutionsByName } from "../doctorPage/doctorFetch.js";

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const defaultText = "no matches by this id";
    const jwt = localStorage.getItem("doctor-jwt");

    const data = await getResolutionsByName(jwt, input.value);

    if (!data) {
      resolutionText.value = defaultText;
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
