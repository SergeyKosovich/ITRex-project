export default function checkBoxChange(checkBox, input) {
  checkBox.addEventListener('change', function () {
    if (this.checked) {
      input.removeAttribute('disabled');
      return;
    }
    input.setAttribute('disabled', 'disabled');
  });
}
