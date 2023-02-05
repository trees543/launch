const readline = require('readline-sync');
const MESSAGES = require('./messages.json');

console.log(MESSAGES.welcome);

function prompt(message) {
  return readline.question(`=> ${message}\n`);
}

function isInvalidValue(val, requireWholeNumber=false) {
  return Number.isNaN(Number(val)) ||
		val.trim() === '' ||
		Number(val) < 0 ||
    (requireWholeNumber ? !isWholeNumber(val) : false);
}

function isWholeNumber(val) {
	return val % 1 === 0
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
  let requestAnotherCalculation = prompt(MESSAGES.anotherCalculation);

  if (requestAnotherCalculation[0].toLowerCase() !== 'y') {
    return false;
  } else return true;
}

function getUserInput(loanItem, loanObj) {
  const { item, message, requireWholeNumber } = loanItem;

  let val = prompt(message);

  while (isInvalidValue(val, requireWholeNumber)) {
    let invalidMessage = requireWholeNumber ? MESSAGES.invalid2 : MESSAGES.invalid1
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

do {

  const loan = {};

  [
    {
      item: 'loanAmount',
      message: MESSAGES.loanAmount,
      requireWholeNumber: false
    },
    {
      item: 'apr',
      message: MESSAGES.apr,
      requireWholeNumber: false
    },
    {
      item: 'loanDurationInYears',
      message: MESSAGES.loanDurationInYears,
      requireWholeNumber: true
    },
    {
      item: 'additionalMonthsForLoanDuration',
      message: MESSAGES.additionalMonthsForLoanDuration,
      requireWholeNumber: true
    }
  ].forEach(loanItem => {
    getUserInput(loanItem, loan);
  });

  loan["aprPercentage"] = convertFromNumberToPercentage(loan.apr);

  loan["monthlyInterestRate"] = convertToMonthlyRate(loan.aprPercentage);

  loan["loanDurationInMonths"] = convertFromYearsToMonths(loan.loanDurationInYears, loan.additionalMonthsForLoanDuration);

  let monthlyPayment = calculateMonthlyPayment(loan);

  console.log(`Monthly Loan Payment of: ${formatPayment(monthlyPayment)}`);

} while (newCalculationRequested());
