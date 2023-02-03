const readline = require('readline-sync');
const MESSAGES = require('./messages.json')

const LANGUAGE = 'en'

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function messages(message, lang='en') {
  return MESSAGES[lang][message];
}

console.log(messages('welcome', LANGUAGE));

while (true) {

  // Ask user for 1st number
  let number1 = readline.question(prompt("What's the 1st number?: "));

  while (invalidNumber(number1)) {
    prompt(messages('invalid'));
    number1 = readline.question();
  }
  // Ask user for 2nd number
  let number2 = readline.question(prompt("What's the 2nd number?: "));

  while (invalidNumber(number2)) {
    prompt(messages('invalid', LANGUAGE));
    number2 = readline.question();
  }
  // Ask user for operation to perform
  let operation = readline.question(prompt("What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide "));

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('Must choose 1, 2, 3, or 4');
    operation = readline.question();
  }
  // Perform operation on the 2 numbers
  let output;

  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  // Print result to terminal
  console.log(`The output is: ${output}`);

  let stillInterested = readline.question(prompt("Would you like to perform another calculation?\n 1) Y 2) N"));
  if (stillInterested[0].toLowerCase() !== 'y') break;
}

