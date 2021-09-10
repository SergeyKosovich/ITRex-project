import { docUrl } from '../config.js';

export default async function getPatientsResolutionsById(id) {
  try {
    const jwt = localStorage.getItem('jwt');
    const res = await fetch(`${docUrl}?patient_id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (res.status === 404) {
      return 'no matches by this name';
    }
    if (res.status !== 200) {
      throw new Error(`Something went wrong. Error: ${res.statusText}`);
    }
    const resolutionText = await res.json();
    if (!resolutionText.length) {
      return null;
    }
    return resolutionText.map((resolution) => resolution).join(' ');
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
