import Validate from './Validate';

const validate = new Validate();
validate.bindToDom(document.querySelector('.container'), document.querySelector('.text-box'));

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');

input.addEventListener('keyup', (e) => {
  validate.makeMaskCard(input.value);
  if (e.key === 'Enter') {
    e.preventDefault();
    validate.init(input.value);
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    validate.init(input.value);
  }
});

btn.addEventListener('click', () => {
  validate.init(input.value);
});
