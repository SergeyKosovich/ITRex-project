import { docUrl } from "../../config.js";

export default async function deleteResolution(jwt, name) {
  try {
    const search = `?name=${name}`;

    const response = await fetch(docUrl + search, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (response.status === 404) {
      return { error: "No resolutions you can delete" };
    }

    if (response.status === 409) {
      return {
        error:
          "You cannot delete resolutions for all this patients. \n" +
          "Please choose one of them.",
      };
    }

    if (response.status !== 204) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }

    return {
      success: "Your resolutions have been successfully deleted",
    };
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
