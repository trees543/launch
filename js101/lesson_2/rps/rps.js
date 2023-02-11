const readline = require('readline-sync');
const MESSAGES = require('./messages.json');

const MOVE_OPTIONS = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function prompt(message) {
  return readline.question(`=> ${message}\n`);
}

function getUsersChoice(message) {
  return prompt(`${message}${MOVE_OPTIONS.join(' | ')}`);
}

function getRandomInt() {
  return Math.floor(Math.random() * MOVE_OPTIONS.length);
}

function getCompChoice() {
  let randomIndex = getRandomInt();
  return MOVE_OPTIONS[randomIndex];
}

function isInvalid(selection) {
  return !MOVE_OPTIONS.includes(selection);
}

function userWins(uChoice, cChoice) {
  return (uChoice === 'rock' && ['scissors', 'lizard'].includes(cChoice)) ||
  (uChoice === 'paper' && ['rock', 'spock'].includes(cChoice)) ||
  (uChoice === 'scissors' && ['paper', 'lizard'].includes(cChoice)) ||
  (uChoice === 'lizard' && ['paper', 'spock'].includes(cChoice)) ||
  (uChoice === 'spock' && ['rock', 'scissors'].includes(cChoice));
}

function determineWinnerOfSingleGame(uChoice, cChoice) {
  if (uChoice === cChoice) {
    return 'tie';
  } else if (userWins(uChoice, cChoice)) {
    return 'user';
  } else return 'computer';
}

function userWantsAnotherGame() {
  let answer = prompt(MESSAGES.anotherGame).toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    answer = prompt(MESSAGES.invalidRequestForAnotherGame).toLowerCase();
  }

  console.clear();

  if (answer[0] !== 'y') return false;
  else return true;
}

function incrementScore(sb, winner) {
  if (winner === 'user') {
    sb.user++;
  } else if (winner === 'computer') {
    sb.computer++;
  }
}

function checkForWinner(sb) {
  if (sb.user === 3) {
    return [true, 'You win!'];
  } else if (sb.computer === 3) {
    return [true, 'Computer wins...'];
  } else {
    return [false];
  }
}

function getAndValidateUsersChoice() {
  let usersChoice = getUsersChoice(MESSAGES.chooseRPS);

  while (isInvalid(usersChoice)) {
    usersChoice = getUsersChoice(MESSAGES.invalidChoice);
  }

  return usersChoice;
}

function displayCurrentScoreboard(sb) {
  console.log(`You: ${sb.user}\nComputer: ${sb.computer}\n`);
}

function displaySingleGamePlays(uChoice, cChoice) {
  console.log(`You chose ${uChoice} | the computer chose ${cChoice}.`);
}

function playGame(sb) {
  while (true) {
    let usersChoice = getAndValidateUsersChoice();
    let compChoice = getCompChoice();

    displaySingleGamePlays(usersChoice, compChoice);
    let winnerOfSingleGame = determineWinnerOfSingleGame(
      usersChoice,
      compChoice
    );

    incrementScore(sb, winnerOfSingleGame);
    displayCurrentScoreboard(sb);

    let [isWinner, winner] = checkForWinner(sb);
    if (isWinner) {
      console.log(winner);
      break;
    }
  }
}

function startGame() {
  let scoreboard = {
    user: 0,
    computer: 0
  };

  playGame(scoreboard);
}

while (true) {

  startGame();

  if (!userWantsAnotherGame()) break;
}

console.log('Thanks for playing!');