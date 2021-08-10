/* eslint-disable import/extensions */
import resolutionPost from './resolutionPost.js';

export default function addResolution(map, last, setres, textarea) {
  setres.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = textarea.value;
    const currenPatient = last.innerHTML;
    const mapHasPatient = map.has(currenPatient);
    await resolutionPost(text, currenPatient);
    if (currenPatient === 'No patient' || !text) {
      return;
    }
    if (!mapHasPatient) {
      map.set(currenPatient, [text]);
      textarea.value = '';
    } else {
      const previous = map.get(currenPatient);
      previous.push(text);
      map.set(currenPatient, previous);
      textarea.value = '';
    }
  });
}
