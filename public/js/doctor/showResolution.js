import { getResolutionsById } from "../doctorPage/doctorFetch.js";

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const defaultText = "no matches by this id";
    const jwt = localStorage.getItem("doctor-jwt");

    const data = await getResolutionsById(jwt, input.value);

    if (!data) {
      resolutionText.value = defaultText;
      return;
    }

    const text = data
      .map(
        (resolution) =>
          `\t Resolution №: ${resolution.resolution_id} \n` +
          `Patient: ${resolution.firstName} ${resolution.lastName} \n` +
          `DoB: ${resolution.birthday} \n` +
          `Gender: ${resolution.gender} \n` +
          `Text: ${resolution.resolution} \n` +
          `Date of the resolution: ${resolution.createdData.split("T")[0]} \n` +
          `Doctor: ${resolution.doctorName} \n\n`
      )
      .join(" ");

    resolutionText.value = text;
  });
}
