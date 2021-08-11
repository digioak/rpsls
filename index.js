// Could also be a set...,

const Chance = require('chance');

const chance = new Chance();

const readLine = require('readline-sync');
const _ = require('lodash');

const throwTypes = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const winMapping = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['rock', 'scissors'],
};

console.log('Welcome to Rock, Paper, Scissors, Lizard, Spock!');

const playerChoice = throwTypes[readLine.keyInSelect(throwTypes.map(_.capitalize), 'Choose: ', { cancel: false })];

const opponentChoice = chance.pickone(throwTypes);

console.log(`You chose ${_.capitalize(playerChoice)} and I chose ${_.capitalize(opponentChoice)}.`);

if (playerChoice === opponentChoice) {
  console.log('Tie!');
} else if (winMapping[playerChoice].includes(opponentChoice)) {
  console.log(`${_.capitalize(playerChoice)} beats ${_.capitalize(opponentChoice)}, you win!`);
} else {
  console.log(`${_.capitalize(opponentChoice)} beats ${_.capitalize(playerChoice)}, you lose!`);
}
