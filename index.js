const valuesArray = [
  '1AJS',
  '2BKT',
  '3CLU',
  '4DMV',
  '5ENW',
  '6FOX',
  '7GPY',
  '8HQZ',
  '9IR',
];

// Calculation functions -- START --
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getCharacterValue = (character) => {
  for (let valueIndex = 0; valueIndex < valuesArray.length; valueIndex++) {
    if (valuesArray[valueIndex].includes(character.toUpperCase())) {
      return parseInt(valuesArray[valueIndex][0]);
    }
  }
};

const calculateSum = (valueToCalculate) => {
  if (typeof valueToCalculate === 'number')
    return calculateNumberSum(valueToCalculate);
  if (typeof valueToCalculate === 'string')
    return calculateStringSum(valueToCalculate);
  return null;
};

const calculateStringSum = (stringToCalculate) => {
  let sum = 0;

  for (let charIndex = 0; charIndex < stringToCalculate.length; charIndex++) {
    let characterValue = getCharacterValue(stringToCalculate[charIndex]);
    sum += characterValue;
  }

  return sum;
};

const calculateNumberSum = (numberToCalculate) => {
  let sum = 0;

  while (numberToCalculate > 0) {
    sum += numberToCalculate % 10;
    numberToCalculate = parseInt(numberToCalculate / 10);
  }

  return sum;
};

const calculateTotal = (valueToCalculate, lastSum) => {
  let sum = calculateSum(valueToCalculate);

  if (
    lastSum &&
    (valueToCalculate === 11 ||
      valueToCalculate === 22 ||
      valueToCalculate === 33)
  ) {
    return valueToCalculate;
  }

  if (sum < 10) return sum;

  return calculateTotal(parseInt(sum));
};

// Calculation functions -- END --

//DOM Elements -- START --
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const middleNameInput = document.getElementById('middleName');
const calculateButton = document.getElementById('calculateButton');
const resultParagraph = document.getElementById('resultParagraph');
const yearDropdown = document.getElementById('year');
const dayDropdown = document.getElementById('day');
const monthDropdown = document.getElementById('month');
const emailInput = document.getElementById('emailInput');
const tryAgainButton = document.getElementById('tryAgainButton');
const emailElement = document.getElementById('emailWrapper');
const calculationElement = document.getElementById('calculationArea');

/* Year, day and month dropdown creation */
const generateYearDropdown = (domElement) => {
  let year_satart = 1940;
  let year_end = new Date().getFullYear(); // current year
  let year_selected = 1992;

  let option = '';
  option = '<option>Year</option>'; // first option

  for (let i = year_satart; i <= year_end; i++) {
    let selected = i === year_selected ? ' selected' : '';
    option += '<option value="' + i + '"' + selected + '>' + i + '</option>';
  }
  domElement.innerHTML = option;
};

const generateDayDropdown = (domElement) => {
  let day_selected = new Date().getDate(); // current day
  let option = '';
  option = '<option>Day</option>'; // first option

  for (let i = 1; i < 32; i++) {
    // value day number with 0. 01 02 03 04..
    let day = i <= 9 ? '0' + i : i;

    let selected = i === day_selected ? ' selected' : '';
    option += '<option value="' + i + '"' + selected + '>' + day + '</option>';
  }
  domElement.innerHTML = option;
};

const generateMonthsDropdown = (domElement) => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var month_selected = new Date().getMonth(); // current month
  var option = '';
  option = '<option>Month</option>'; // first option

  for (let i = 0; i < months.length; i++) {
    let selected = i === month_selected ? ' selected' : '';
    option +=
      '<option class="option" value="' +
      (i + 1) +
      '"' +
      selected +
      '>' +
      months[i] +
      '</option>';
  }
  domElement.innerHTML = option;
};

generateYearDropdown(yearDropdown);
generateDayDropdown(dayDropdown);
generateMonthsDropdown(monthDropdown);

//DOM Elements -- END --

let firstNameValue = 0,
  lastNameValue = 0,
  middleNameValue = 0;
(selectedDay = 20),
  (selectedMonth = 7),
  (selectedYear = 1992),
  (emailInputValue = '');

const setDisabledButton = (
  nameInputValue,
  lastNameInputValue,
  buttonElement
) => {
  let buttonDisabled = nameInputValue == 0 || lastNameInputValue == 0;

  buttonElement.disabled = buttonDisabled;

  if (buttonDisabled) {
    buttonElement.classList.add('buttonDisabled');
  } else {
    buttonElement.classList.remove('buttonDisabled');
  }
};

//Event listeners -- START --
firstNameInput.addEventListener('change', (e) => {
  firstNameValue = calculateTotal(e.target.value);

  setDisabledButton(firstNameValue, lastNameValue, calculateButton);
});

lastNameInput.addEventListener('change', (e) => {
  lastNameValue = calculateTotal(e.target.value);

  setDisabledButton(firstNameValue, lastNameValue, calculateButton);
});

middleNameInput.addEventListener('change', (e) => {
  middleNameValue = calculateTotal(e.target.value);
});

yearDropdown.addEventListener('change', (e) => {
  console.log('changing year... ', e.target.value);
  selectedYear = parseInt(e.target.value);
});

dayDropdown.addEventListener('change', (e) => {
  console.log('changing day... ', e.target.value);
  selectedDay = parseInt(e.target.value);
});

monthDropdown.addEventListener('change', (e) => {
  console.log('changing month... ', e.target.value);
  selectedMonth = parseInt(e.target.value);
});

setDisabledButton(firstNameValue, lastNameValue, calculateButton);

calculateButton.addEventListener('click', () => {
  let nameCalculation = calculateTotal(
    calculateTotal(firstNameValue) +
      calculateTotal(lastNameValue) +
      calculateTotal(middleNameValue)
  );
  console.log(nameCalculation);
  let dateCalculation = calculateTotal(
    calculateTotal(selectedDay) +
      calculateTotal(selectedMonth) +
      calculateTotal(selectedYear)
  );
  console.log(dateCalculation);

  let granTotal = calculateTotal(
    calculateTotal(nameCalculation) + calculateTotal(dateCalculation),
    true
  );
  console.log(granTotal);
  calculationElement.style.display = 'none';

  const loaderElement = document.getElementById('loader');
  loaderElement.style.display = 'block';

  setTimeout(() => {
    loaderElement.style.display = 'none';
    resultParagraph.innerText = `Your angel number is ${granTotal}`;
    // resultParagraph.innerText = `Your angel number is ${nameCalculation}`;
    // resultParagraph.innerText = `Your angel number is ${dateCalculation}`;
    emailElement.style.display = 'flex';
  }, 2000);
});

tryAgainButton.addEventListener('click', () => {
  emailElement.style.display = 'none';
  calculationElement.style.display = 'flex';
  resultParagraph.innerText = '';
  firstNameValue = 0;
  lastNameValue = 0;
  middleNameValue = 0;
  console.log(firstNameInput);
  firstNameInput.value = '';
  lastNameInput.value = '';
  middleNameInput.value = '';
  setDisabledButton(firstNameValue, lastNameValue, calculateButton);
});

//Events listeners --END--
