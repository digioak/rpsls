const Chance = require('chance');

const chance = new Chance();

const readLine = require('readline-sync');
const _ = require('lodash');

// Could also be a Set...,
const throwTypes = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const winMapping = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['rock', 'scissors'],
};

const BEST_OF = 3;
let playerScore = 0;
let opponentScore = 0;

console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!');
console.log(`Let's play best of ${BEST_OF}.`);

// eslint-disable-next-line no-constant-condition
while (true) {
  const playerChoice = throwTypes[readLine.keyInSelect(throwTypes.map(_.capitalize),
    'Choose: ', { cancel: false })];

  const opponentChoice = chance.pickone(throwTypes);

  console.log(`You chose ${_.capitalize(playerChoice)} and I chose ${_.capitalize(opponentChoice)}.`);

  if (playerChoice === opponentChoice) {
    console.log('This round is a draw!');
  } else if (winMapping[playerChoice].includes(opponentChoice)) {
    console.log(`${_.capitalize(playerChoice)} beats ${_.capitalize(opponentChoice)}, you win this round!`);
    playerScore++;
  } else {
    console.log(`${_.capitalize(opponentChoice)} beats ${_.capitalize(playerChoice)}, you lose this round!`);
    opponentScore++;
  }

  console.log(`The score is you ${playerScore}, me ${opponentScore}.`);

  if (playerScore === BEST_OF - 1 || opponentScore === BEST_OF - 1) {
    if (playerScore > opponentScore) {
      console.log('YOU WIN THE GAME, CONGRATULATIONS!');
    } else {
      console.log('YOU LOSE THE GAME, BETTER LUCK NEXT TIME!');
    }

    if (readLine.keyInYN('Play again?')) {
      console.log(`Let's play again, best of ${BEST_OF}.`);
      playerScore = 0;
      opponentScore = 0;
    } else {
      console.log('Thanks for playing, bye!');
      break;
    }
  }
}
