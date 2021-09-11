import getPatientsResolutionsById from "../httpRequests/getResolutionById.js";

export default function showResolutionForPatient(form, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");

    const data = await getPatientsResolutionsById(jwt);
    if (!data) {
      return;
    }

    const text = data
      .map(
        (resolution) =>
          `\t Resolution №: ${resolution.resolution_id} \n` +
          `Text: ${resolution.resolution} \n` +
          `Date of the resolution: ${resolution.createdData.split("T")[0]} \n` +
          `Doctor: ${resolution.doctorName} \n\n`
      )
      .join(" ");

    resolutionText.value = text;
  });
}
