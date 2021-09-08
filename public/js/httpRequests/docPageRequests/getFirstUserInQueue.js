import { userUrl } from '../../config.js';

export default async function getFirstUserInQueue() {
  let name = 'No patient';
  try {
    const userCurrent = await fetch(userUrl);
    if (!userCurrent.status === 200) {
      throw new Error(`Something went wrong. Error: ${userCurrent.statusText}`);
    }
    name = await userCurrent.json();
  } catch (err) {
    console.log(err);
  }
  return name;
}