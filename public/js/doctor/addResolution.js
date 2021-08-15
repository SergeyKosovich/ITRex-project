import resolutionPost from './resolutionPost.js';

export default function addResolution(storage, lastPatient, setRes, textarea) {
  setRes.addEventListener('submit', async (e) => {
    e.preventDefault();
    const resolutionText = textarea.value;
    const currenPatient = lastPatient.innerHTML;
    try {
      const response = await resolutionPost(resolutionText, currenPatient);
      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (err) {
      console.log(err.name, err.message);
      return;
    }
    textarea.value = '';
  });
}
