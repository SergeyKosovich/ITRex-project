import { userUrl } from '../../config.js';

export default async function getFirstPatientInQueue(jwt) {
  const patient = { name: 'No patient' };
  try {
    const userCurrent = await fetch(userUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (userCurrent.status !== 200) {
      throw new Error(`Something went wrong. Error: ${userCurrent.statusText}`);
    }
    const response = await userCurrent.json();
    patient.name = response.name;
    return patient;
  } catch (err) {
    console.log(err);
  }
  return patient;
}
