import getPatientsResolutionsById from "../httpRequests/getResolutionById.js";

export default async function showResolution(form, input, resolutionText) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const defaultText = "no matches by this id";
    const jwt = localStorage.getItem("doctor-jwt");

    const response = await getPatientsResolutionsById(input.value, jwt);
    if (!response) {
      resolutionText.value = defaultText;
      return;
    }
    resolutionText.value = response;
  });
}
