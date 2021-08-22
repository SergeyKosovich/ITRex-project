import { docUrl } from '../config.js';

export default async function getResolutionByName(name) {
  try {
    const res = await fetch(`${docUrl}?name=${name}`);
    if (res.status !== 200) {
      throw new Error(`Something went wrong. Error: ${res.status}`);
    }
    const resolutionText = await res.json();

    return resolutionText;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
