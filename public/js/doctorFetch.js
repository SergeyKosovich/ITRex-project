async function loginDoctor(credential) {
  try {
    const response = await fetch("/auth/doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    const data = await response.json();

    if (response.status === 401) {
      alert(`Authorization Error::   ${data.message}`);
      return;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }

    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

async function getDoctorData(id, jwt) {
  try {
    const response = await fetch("staff/doctor/" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (response.status === 401) {
      window.location.href = `http://localhost:3000/doctorLogin.html`;
    } else if (response.status !== 200) {
      throw new Error(`Something went wrong. Error: ${response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

export { getDoctorData, loginDoctor };
