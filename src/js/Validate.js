/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
export default class Validate {
  constructor() {
    this.container = null;
    this.textBox = null;
  }

  bindToDom(container, textBox) {
    if (!(container instanceof HTMLElement) || !(textBox instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.textBox = textBox;
  }

  init(value) {
    if (this.checkEmpty(value)) {
      if (this.checkCreditCard(value)) {
        this.addValid();
      } else {
        this.addNoValid();
      }
    }
  }

  makeMaskCard(value) {
    this.textBox.textContent = '';
    const cards = this.container.querySelectorAll('.card');
    const classCard = this.getCardClass(value);
    cards.forEach((card) => {
      if (value === '') {
        card.classList.remove('card-mask');
      } else if (!card.classList.contains(classCard)) {
        card.classList.add('card-mask');
      }
    });
  }

  getCardClass(value) {
    const amerEx = ['34', '37'];
    const jcb = ['31', '35'];
    const masCar = ['51', '52', '53', '54', '55'];
    const dinCl = ['30', '36', '38'];

    if (value.slice(0, 1) === '2') {
      return 'mir';
    }

    if (value.slice(0, 1) === '4') {
      return 'visa';
    }

    if (value.slice(0, 2) === '62') {
      return 'unionpay';
    }

    if (amerEx.includes(value.slice(0, 2))) {
      return 'american-express';
    }

    if (jcb.includes(value.slice(0, 2))) {
      return 'jcb';
    }

    if (masCar.includes(value.slice(0, 2))) {
      return 'mastercard';
    }

    if (dinCl.includes(value.slice(0, 2))) {
      return 'diners-club';
    }
    return false;
  }

  checkCreditCard(value) {
    let sum = 0;
    for (let i = 0; i < value.length; i += 1) {
      let cardNum = parseInt(value[i]);

      if ((value.length - i) % 2 === 0) {
        cardNum *= 2;

        if (cardNum > 9) {
          cardNum -= 9;
        }
      }

      sum += cardNum;
    }
    return sum % 10 === 0;
  }

  checkEmpty(value) {
    this.textBox.innerHTML = '';
    if (value === '' || isNaN(parseInt(value))) {
      const div = document.createElement('div');
      div.textContent = 'Please insert a number';
      this.textBox.append(div);
      return false;
    }

    return true;
  }

  addValid() {
    this.textBox.innerHTML = '';
    const check = '\u{2713}';
    const div = document.createElement('div');
    div.textContent = `${check} Your number is valid`;
    div.classList.add('valid');
    this.textBox.append(div);
  }

  addNoValid() {
    this.textBox.innerHTML = '';
    const cross = '\u{274C}';
    const div = document.createElement('div');
    div.textContent = `${cross} Your number is not valid`;
    div.classList.add('invalid');
    this.textBox.append(div);
  }
}
