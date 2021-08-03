export default function addResolution(map, last, setres, textarea) {
  setres.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textarea.value;
    if (last.innerHTML !== 'No patient' && !map.has(last.innerHTML) && text) {
      map.set(last.innerHTML, [text]);
      textarea.value = '';
    } else if (
      last.innerHTML !== 'No patient'
      && map.has(last.innerHTML)
      && text
    ) {
      const previous = map.get(last.innerHTML);     
      previous.push(text);
      map.set(last.innerHTML, previous);
      textarea.value = '';
    }
  });
}
