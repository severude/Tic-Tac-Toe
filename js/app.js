'use strict';

// Element selectors
const start = document.getElementById('start');
const button = document.querySelector('.button');
const board = document.getElementById('board');
const finish = document.getElementById('finish');

// Turn off board and finish screens before starting the game
board.style.display = 'none';
finish.style.display = 'none';

// Click to start the game and turn on the board
button.onclick = () => {
	start.style.display = 'none';
	board.style.display = 'block';
};
