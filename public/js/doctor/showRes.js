export default function showRes(map, form, input, resoltext) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (map.has(input.value)) {
      resoltext.value = map.get(input.value);
      return;
    }
    resoltext.value = 'no matches by this name';
    input.value = '';
  });
}
