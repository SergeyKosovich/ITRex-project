import { docUrl } from "../../config.js";

export default async function deleteResolution(val) {
  try {
    const jwt = localStorage.getItem("doctor-jwt");
    const response = await fetch(docUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ patient_id: val }),
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
