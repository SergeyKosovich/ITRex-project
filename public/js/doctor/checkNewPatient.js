import getUser from '../hhtpRequests/dockPage/getUser.js';
import { data } from '../main.js';

const { userUrl } = data;

export default async function checkNewPatients(lastPatient) {
  try {
    let name = 'No patient';
    const userCurrent = await getUser(userUrl);
    if (!userCurrent.status === 200) {
      throw new Error(userCurrent.status);
    }
    name = await userCurrent.json();
    lastPatient.innerHTML = name;
  } catch (err) {
    lastPatient.innerHTML = 'No patient';
    console.log(err);
  }
}
