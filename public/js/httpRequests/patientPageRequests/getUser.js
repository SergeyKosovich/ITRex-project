export default async function getUser(jwt) {
  try {
    const response = await fetch("/patient/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }
    return response.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
