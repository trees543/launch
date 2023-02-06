const readline = require('readline-sync');
const MESSAGES = require('./messages.json');

const loanItems =   [
  {
    item: 'loanAmount',
    message: MESSAGES.loanAmount,
    invalidMessage: MESSAGES.invalid1,
    additionalValidators: [isInvalidEqualsZero]
  },
  {
    item: 'apr',
    message: MESSAGES.apr,
    invalidMessage: MESSAGES.invalid1,
    additionalValidators: [isInvalidEqualsZero]
  },
  {
    item: 'loanDurationInYears',
    message: MESSAGES.loanDurationInYears,
    invalidMessage: MESSAGES.invalid2,
    additionalValidators: [isInvalidNotInteger]
  },
  {
    item: 'additionalMonthsForLoanDuration',
    message: MESSAGES.additionalMonthsForLoanDuration,
    invalidMessage: MESSAGES.invalid2,
    additionalValidators: [isInvalidNotInteger]
  }
];

function prompt(message) {
  return readline.question(`=> ${message}\n`);
}

function isInvalidStandard(val) {
  let numericValue = Number(val);
  return Number.isNaN(numericValue) ||
  val.trim() === '' ||
  numericValue < 0 ||
  numericValue === Infinity;
}

function isInvalidNotInteger(val) {
  return Number(val) % 1 !== 0;
}

function isInvalidEqualsZero(val) {
  return Number(val) === 0;
}

function isInvalidValue(val, additionalValidators = []) {
  let validators = [isInvalidStandard];
  
  for (let validator of additionalValidators) {
    validators.push(validator);
  }

  for (let isInvalid of validators) {
    if (isInvalid(val)) return true;
  }

  return false;
}

function convertToMonthlyRate(rate) {
  return Number(rate) / 12;
}

function convertFromYearsToMonths(years, months) {
  return (Number(years) * 12) + Number(months);
}

function convertFromNumberToPercentage(num) {
  return Number(num) / 100;
}

function formatPayment(pmt) {
  return `$${pmt.toFixed(2)}`;
}

function newCalculationRequested() {
  let requestAnotherCalculation = prompt(MESSAGES.anotherCalculation).toLowerCase();

  switch (requestAnotherCalculation) {
    case 'y':
    case 'yes':
      console.clear();
      return true;
    case 'n':
    case 'no':
      console.clear();
      return false;
    default:
      console.log(MESSAGES.invalidDecision);
      return newCalculationRequested();
  }
}

function getUserInput(loanItem, loanObj) {
  const { item, message, invalidMessage, additionalValidators } = loanItem;

  let val = prompt(message);

  while (isInvalidValue(val, additionalValidators)) {
    val = prompt(invalidMessage);
  }

  loanObj[item] = val;
}

function calculateMonthlyPayment(loan) {
  const {
    loanAmount,
    monthlyInterestRate,
    loanDurationInMonths
  } = loan;

  return loanAmount *
  (monthlyInterestRate /
  (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths)))
  );
}

console.log(MESSAGES.welcome);

do {

  const loan = {};

  loanItems.forEach(loanItem => {
    getUserInput(loanItem, loan);
  });

  loan["loanDurationInMonths"] = convertFromYearsToMonths(loan.loanDurationInYears, loan.additionalMonthsForLoanDuration);

  while (loan.loanDurationInMonths === 0) {

    console.log(MESSAGES.loanDurationInvalid);

    loanItems.slice(2).forEach(loanItem => {
      getUserInput(loanItem, loan);
    });

    loan["loanDurationInMonths"] = convertFromYearsToMonths(loan.loanDurationInYears, loan.additionalMonthsForLoanDuration);
  }

  loan["aprPercentage"] = convertFromNumberToPercentage(loan.apr);

  loan["monthlyInterestRate"] = convertToMonthlyRate(loan.aprPercentage);

  let monthlyPayment = calculateMonthlyPayment(loan);

  console.log(`Monthly Loan Payment of: ${formatPayment(monthlyPayment)}`);

} while (newCalculationRequested());