import { docUrl } from "../config.js";

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

async function getDoctorData(doctorId, jwt) {
  try {
    const response = await fetch("staff/doctor/" + doctorId, {
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

async function getResolutionsById(jwt, name) {
  try {
    const search = `?name=${name}`;

    const res = await fetch(docUrl + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.status === 404) {
      return null;
    }
    if (res.status !== 200) {
      throw new Error(`Something went wrong. Error: ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

export { getDoctorData, loginDoctor, getResolutionsById };
