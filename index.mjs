import Chance from 'chance';
import pkg from 'lodash';
import { keyInSelect, keyInYN } from 'readline-sync';

const { capitalize } = pkg;
const chance = new Chance();

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
  const playerChoice = throwTypes[keyInSelect(throwTypes.map(capitalize),
    'Choose: ', { cancel: false })];

  const opponentChoice = chance.pickone(throwTypes);

  console.log(`You chose ${capitalize(playerChoice)} and I chose ${capitalize(opponentChoice)}.`);

  if (playerChoice === opponentChoice) {
    console.log('This round is a draw!');
  } else if (winMapping[playerChoice].includes(opponentChoice)) {
    console.log(`${capitalize(playerChoice)} beats ${capitalize(opponentChoice)}, you win this round!`);
    playerScore++;
  } else {
    console.log(`${capitalize(opponentChoice)} beats ${capitalize(playerChoice)}, you lose this round!`);
    opponentScore++;
  }

  console.log(`The score is you ${playerScore}, me ${opponentScore}.`);

  if (playerScore === BEST_OF - 1 || opponentScore === BEST_OF - 1) {
    if (playerScore > opponentScore) {
      console.log('YOU WIN THE GAME, CONGRATULATIONS!');
    } else {
      console.log('YOU LOSE THE GAME, BETTER LUCK NEXT TIME!');
    }

    if (keyInYN('Play again?')) {
      console.log(`Let's play again, best of ${BEST_OF}.`);
      playerScore = 0;
      opponentScore = 0;
    } else {
      console.log('Thanks for playing, bye!');
      break;
    }
  }
}
