import { data } from '../../main.js';

const { userUrl } = data;
export default async function deleteFromStack(url = userUrl) {
  try {
    const lastPatient = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let response = 'No patient';
    if (lastPatient.status !== 200 && lastPatient.status !== 204) {
      throw new Error(lastPatient.status);
    }
    if (lastPatient.status === 200) {
      response = await lastPatient.json();
    }
    return response;
  } catch (err) {
    console.log(err.name, err.message);
    return false;
  }
}
