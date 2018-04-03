'use strict';

// Tic Tac Toe Module
(function ticTacToe() {

	// Element selectors
	const start = document.getElementById('start');
	const button = document.querySelector('.button');
	const board = document.getElementById('board');
	const player1 = document.getElementById('player1');
	const player2 = document.getElementById('player2');
	const boxes = document.querySelector('.boxes');
	const finish = document.getElementById('finish');

	// Turn off board and finish screens before starting the game
	board.style.display = 'none';
	finish.style.display = 'none';
	let player = 1; // Player 1 starts with "O"

	// Click to start the game and turn on the board
	button.onclick = () => {
		start.style.display = 'none';
		board.style.display = 'block';
		player1.className = 'players active';
	};
	
	// Give each box a unique identifier
	for(let index = 0; index < boxes.children.length; index++) {
		let li = boxes.children[index];
		li.id = index;
	}

	// Constructor for each box
	function Box(index) {
		this.index = index;
		this.mark = "";
	}

	// Array of Box objects
	let boxList = [new Box(1), new Box(2), new Box(3),
				   new Box(4), new Box(5), new Box(6),
				   new Box(7), new Box(8), new Box(9)];

	// Show X or O when hovering over an empty box
	boxes.addEventListener('mouseover', (event) => {
		let selectedElement = event.target;
		// Only change if box is unmarked
		if(boxList[selectedElement.id].mark === "") {
			if (player === 1) {
				selectedElement.style.backgroundImage = 'url(../img/o.svg)';
			} else if (player === 2) {
				selectedElement.style.backgroundImage = 'url(../img/x.svg)';
			}
		}
	});


	// Remove X or O when hovering over an empty box
	boxes.addEventListener('mouseout', (event) => {
		event.target.style.backgroundImage = "";
	});

	// Mark an empty box with an X or O when clicking on it
	boxes.addEventListener('click', (event) => {
		let clickedElement = event.target;
		// Only change if box is unmarked
		if(boxList[clickedElement.id].mark === "") {
			if (player === 1) {
				boxList[clickedElement.id].mark = "O";
				clickedElement.className = 'box box-filled-1';
				player1.className = 'players';
				player2.className = 'players active';
				player = 2;
			} else if (player === 2) {
				boxList[clickedElement.id].mark = "X";
				clickedElement.className = 'box box-filled-2';
				player1.className = 'players active';
				player2.className = 'players';
				player = 1;
			}
		}
	});

// End Tic Tac Toe Module
}());
