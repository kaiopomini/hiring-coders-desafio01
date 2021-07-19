// countdown

const targetDate = new Date('2021-11-26T03:00:00.000Z').getTime()
const countdownEl = document.getElementById('countdown');

function leadingZero(number, size = 2) {
  let s = String(number);
  while (s.length < (size)) {
    s = "0" + s;
  }
  return s;

}

setInterval(() => {
  const currentDate = new Date().getTime()
  let totalySeconds = (targetDate - currentDate) / 1000
  const days = parseInt(totalySeconds / 86400);
  totalySeconds = totalySeconds % 86400;

  const hours = parseInt(totalySeconds / 3600);
  totalySeconds = totalySeconds % 3600;

  const mins = parseInt(totalySeconds / 60);
  const secs = parseInt(totalySeconds % 60);
  const templateDate = `${days} dias ${leadingZero(hours)}h ${leadingZero(mins)}m ${leadingZero(secs)}s`;
  countdownEl.innerText = templateDate;
}, 1000)

// slider

let container, products, translate;

container = document.getElementById('slider-container');

products = [
  {
    name: 'bis',
    src: './assets/bis.png',
    price: '50,99'
  },
  {
    name: 'coke',
    src: './assets/coke.png',
    price: '3,99'
  },
  {
    name: 'heineken',
    src: './assets/heineken.png',
    price: '5,99'
  },
  {
    name: 'nestle-chocolate',
    src: './assets/nestle-chocolate.png',
    price: '4,90',
  }
];

translate = 0;

(function setSlider() {
  products.forEach((image, index) => {
    if (index == 0) {
      container.innerHTML += `
        <div class="image-container" id="first-image-container" style="margin-left: 0%;">
          <img src="${image.src}" alt="${image.name}"/>
          <div class="price">
            <img src="./assets/price-tag-black.png" />
            <p>R$${leadingZero(image.price)}</p>
          </div>
        </div>
      `
    } else {
      container.innerHTML += `
        <div class="image-container">
          <img src="${image.src}" alt="${image.name}" />
          <div class="price">
            <img src="./assets/price-tag-black.png" />
            <p>R$${image.price}</p>
          </div>
          
        </div>
      `
    };
  })
})()

let maxStep = () => {
  return (products.length - 1) * 100;
}

function toMove(orientation) {
  if (orientation === 'p') {
    if (translate != 0) {
      translate = translate - 100;
    } else {
      translate = maxStep();
    }
  } else if (orientation === 'n') {
    if (translate != maxStep()) {
      translate = translate + 100;
    } else {
      translate = 0;
    }
  }
  var container = document.getElementById('first-image-container');
  container.style.marginLeft = '-' + translate + '%';
}

var sliderAutoPlay = setInterval(() => {
  toMove('n');
}, 10000);


/// form

const form = document.getElementById('form');
const userName = document.getElementById('name');
const email = document.getElementById('email');
let errors = false

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
  errors = true;
}

function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'form-control'

}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if(re.test(input.value.trim())) {
      showSuccess(input)
  } else {
      showError(input, 'O email não é válido')
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input){
      if(input.value.trim() === '') {
          showError(input, 'Este campo é obrigatório')
      }
      else {
          showSuccess(input)
      }
  } )
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  checkRequired([userName, email])
  if(!errors) {
    checkEmail(email)
  }
  if(!errors) {
    const data = { 
      name: userName.value, 
      email: email.value, 
    }
    localStorage.setItem('lead', JSON.stringify(data))
  }
  errors = false;
})