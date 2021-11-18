'use strict';

var srcEle = document.querySelector('img');
var btnRoll = document.querySelector('.btn--roll');
var newGame = document.querySelector('.btn--new');
var current_0 = document.getElementById('current--0');
var current_1 = document.getElementById('current--1');
var score_0 = document.getElementById('score--0');
var score_1 = document.getElementById('score--1');
var Hold = document.querySelector('.btn--hold');
var player_0 = document.querySelector('.player--0');
var player_1 = document.querySelector('.player--1');

//Roll Dice //using First Player
const rollDice = () => {
  var Rdom = Math.ceil(Math.random() * 6);
  srcEle.setAttribute('src', 'dice-' + Rdom + '.png');
  if (Rdom == 1) {
    changePlayer_of_1();
    current_0.textContent = 0;
    current_1.textContent = 0;
  } else {
    if (player_0.classList.contains('player--active')) {
      var currentScore = Number(current_0.textContent);
      currentScore += Rdom;
      current_0.textContent = currentScore;
    } else {
      var currentScore = Number(current_1.textContent);
      currentScore += Rdom;
      current_1.textContent = currentScore;
    }
  }
};

//Remove Class Section
const removeClass = (player, className) => {
  eval('player_' + player).classList.remove(className);
};
const addClass = (player, className) => {
  eval('player_' + player).classList.add(className);
};
//Select Player Section
const selectPlayer = num => {
  var num2 = '';
  num == '0' ? (num2 = '1') : (num2 = '0');
  var currentScore = Number(eval('current_' + num).textContent);
  var totalScore = Number(eval('score_' + num).textContent);
  totalScore += currentScore;
  eval('score_' + num).textContent = totalScore;
  eval('current_' + num).textContent = 0;
  if (totalScore >= 100) {
    addClass(num, 'win');
    eval('score_' + num).textContent = 'Winner !!';
    // HoldClick();
    // RollClick();
  } else {
    removeClass(num, 'player--active');
    addClass(num2, 'player--active');
  }
};

//ChangePlayer
const changePlayer = () => {
  if (player_0.classList.contains('player--active')) {
    selectPlayer('0');
  } else {
    selectPlayer('1');
  }
};

const changePlayer_of_1 = () => {
  if (player_0.classList.contains('player--active')) {
    removeClass('0', 'player--active');
    addClass('1', 'player--active');
    current_0.textContent = 0;
  } else {
    removeClass('1', 'player--active');
    addClass('0', 'player--active');
    current_1.textContent = 0;
  }
};

//Restart Game
const restartGame = () => {
  removeClass('0', 'win');
  removeClass('1', 'win');
  addClass('0', 'player--active');
  removeClass('1', 'player--active');
  score_0.textContent = 0;
  score_1.textContent = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;
  srcEle.setAttribute('src', 'start.png');
};
//When Win Click
function winCheck(doSomething) {
  if (
    player_0.classList.contains('win') ||
    player_1.classList.contains('win')
  ) {
  } else {
    doSomething();
  }
}

Hold.addEventListener('click', () => {
  winCheck(changePlayer);
});
btnRoll.addEventListener('click', () => {
  winCheck(rollDice);
});
newGame.addEventListener('click', restartGame);
