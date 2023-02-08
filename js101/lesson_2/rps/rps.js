const readline = require('readline-sync');
const MESSAGES = require('./messages.json');

const MOVE_OPTIONS = ['rock', 'paper', 'scissors'];

function prompt(message) {
	return readline.question(`=> ${message}\n`);
};

function getUsersChoice(message) {
	return prompt(`${message}${MOVE_OPTIONS.join(' | ')}`);
};

function getRandomInt() {
	return Math.floor(Math.random() * MOVE_OPTIONS.length);
};

function getCompChoice() {
	let randomIndex = getRandomInt(0, 2);
	return MOVE_OPTIONS[randomIndex];
}

function isInvalid(selection) {
	return !MOVE_OPTIONS.includes(selection);
};

function determineWinner(uChoice, cChoice) {
	if (uChoice === cChoice) {
		return 'Tie!'
	} else if (
		(uChoice === 'rock' && cChoice === 'scissors') ||
		(uChoice === 'paper' && cChoice === 'rock') ||
		(uChoice === 'scissors' && cChoice === 'paper')
	) {
		return 'You win!'
	} else return 'Computer wins...'
}

function userWantsAnotherGame() {
	let answer = prompt(MESSAGES.anotherGame).toLowerCase();
	while (answer[0] !== 'n' && answer[0] !== 'y') {
		answer = prompt(MESSAGES.invalidRequestForAnotherGame).toLowerCase();
	}
	console.clear();
	if (answer[0] !== 'y') return false;
	else return true;
};

while (true) {
	let usersChoice = getUsersChoice(MESSAGES.chooseRPS);

	while (isInvalid(usersChoice)) {
		usersChoice = getUsersChoice(MESSAGES.invalidChoice);
	}

	let compChoice = getCompChoice();

	console.log(`You chose ${usersChoice} | the computer chose ${compChoice}.`);
	
	let outcome = determineWinner(usersChoice, compChoice);
	
	console.log(outcome);

	if (!userWantsAnotherGame()) break;
}

console.log('Thanks for playing!')