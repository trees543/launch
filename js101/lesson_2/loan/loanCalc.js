const readline = require('readline-sync');
const MESSAGES = require('./messages.json')

console.log('Welcome to the loan calculator!');

const loan = {
	loanAmount: null,
	apr: null,
	loanDurationInYears: null,
	additionalMonthsOnLoanDuration: null
}

function isInvalidValue(val) {
  return Number.isNaN(Number(val)) || // handles strings
		val.trim() === '' || // handles empty string converting to 0
		Number(val) < 0; // handles negative numbers
}

function prompt(message) {
  return readline.question(`=> ${message}\n`);
}

function convertToMonthlyRate(rate) {
  return Number(rate) / 12;
}

function convertFromYearsToMonths(years, months) {
  return (Number(years) * 12) + Number(months);
}

function convertFromNumberToPercentage(num) {
	return Number(num) / 100
}

function formatPayment(pmt) {
	return `$${pmt.toFixed(2)}`
}

function newCalculation() {
	let requestAnotherCalculation = prompt(MESSAGES.anotherCalculation);
	if (requestAnotherCalculation[0].toLowerCase() !== 'y') {
		return false;
	} else return true;
}

function askQuestion(item) {
	let val = prompt(MESSAGES[item]);
	while(isInvalidValue(val)) {
		val = prompt(MESSAGES.invalid);
	}
	loan[item] = val
}



while (true) {
	// Ask user for loan amount
		// Check if loan amount is a number that is positive
		askQuestion('loanAmount');
		
		//Ask user for apr
			// Check if apr is a number that is positive
		askQuestion('apr');
		
		// Ask user for loan duration
			// Check if loan duration is a number that is positive
		askQuestion('loanDurationInYears');
		
		askQuestion('additionalMonthsForLoanDuration');
		//Convert interest rate to percentage
		loan.apr = convertFromNumberToPercentage(loan.apr)
		// Convert interest rate to monthly
		let monthlyInterestRate = convertToMonthlyRate(loan.apr);
		// Convert loan duration to monthly
		let loanDurationInMonths = convertFromYearsToMonths(loan.loanDurationInYears, loan.additionalMonthsOnLoanDuration);
		
		//Once all values received and converted, use the formula
		function calculateMonthlyPayment() {
			const { loanAmount } = loan;
			return loanAmount * 
				(monthlyInterestRate / 
					(1 - Math.pow((1 + monthlyInterestRate), (-loanDurationInMonths)))
				);
		}
		
		let monthlyPayment = calculateMonthlyPayment();
		
		console.log(`Monthly Loan Payment of: ${formatPayment(monthlyPayment)}`);

		if (!newCalculation()) break;
}



