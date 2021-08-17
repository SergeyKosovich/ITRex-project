import { data } from '../../main.js';

const { userUrl } = data;

export default async function getUser(url = userUrl) {
  let name = 'No patient';
  try {
    const userCurrent = await fetch(url);
    if (!userCurrent.status === 200) {
      throw new Error(userCurrent.status);
    }
    name = await userCurrent.json();
    return name;
  } catch (err) {
    console.log(err);
    return name;
  }
}
