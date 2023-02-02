const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

console.log('Welcome to the calculator!');
// Ask user for 1st number
let number1 = readline.question(prompt("What's the 1st number?: "));

while (invalidNumber(number1)) {
  prompt("Hmm... that doesn't look like a valid number.");
  number1 = readline.question();
}
// Ask user for 2nd number
let number2 = readline.question(prompt("What's the 2nd number?: "));

while (invalidNumber(number2)) {
  prompt("Hmm... that doesn't look like a valid number.");
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