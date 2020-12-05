import Validate from '../Validate';

test('check method bindToDom', () => {
  function checkValid() {
    const validate = new Validate();
    validate.bindToDom(null, null);
  }
  expect(checkValid).toThrowError(new Error('container is not HTMLElement'));
});

test.each([
  ['false check input', '', false],
  ['false check input', 'ololo', false],
  ['true check input', '4556559035294391', true],
])('it should be %s', (_, input, expected) => {
  const validate = new Validate();
  validate.textBox = document.createElement('div');
  expect(validate.checkEmpty(input)).toBe(expected);
});

test.each([
  ['false check number card #1', '658255', false],
  ['false check number card #2', '45456431345454534', false],
  ['true check number card #1', '4556559035294391', true],
  ['true check number card #2', '3537795641101101', true],
])('it should be %s', (_, input, expected) => {
  const validate = new Validate();
  expect(validate.checkCreditCard(input)).toBe(expected);
});

test.each([
  ['check payment system #1', '4024007163553323', 'visa'],
  ['check payment system #2', '5235610462231848', 'mastercard'],
  ['check payment system #3', '3534618141849404', 'jcb'],
  ['check payment system #4', '2200000000000000', 'mir'],
  ['check payment system #5', '6288123456789010', 'unionpay'],
  ['check payment system #6', '347957468121572', 'american-express'],
  ['check payment system #7', '36195557344179', 'diners-club'],
])('it should be %s', (_, input, expected) => {
  const validate = new Validate();
  expect(validate.getCardClass(input)).toBe(expected);
});
