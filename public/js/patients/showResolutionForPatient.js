import getPatientsResolutions from "../httpRequests/getResolutionById.js";

export default function showResolutionForPatient(form, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const deafaultMessage = "You have no resolutions!";
    const jwt = localStorage.getItem("jwt");

    const data = await getPatientsResolutions(jwt);
    if (!data) {
      resolutionText.value = deafaultMessage;
      return;
    }

    const text = data
      .map(
        (resolution) =>
          `\t Resolution №: ${resolution.resolution_id} \n` +
          `Resolution: ${resolution.resolution} \n` +
          `Date of the resolution: ${resolution.createdData.split("T")[0]} \n` +
          `Doctor: ${resolution.doctorName} \n\n`
      )
      .join(" ");

    resolutionText.value = text;
  });
}
